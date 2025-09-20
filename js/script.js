window.addEventListener('load', () => {

    const allSelectors = {
        header: document.querySelector("header"),
        menuBtn: document.getElementById("menu-btn"),
        floatingMenu: document.getElementById("floating-menu"),
        channelListingsContainer: document.getElementById("channel-listings"),
        spinner: document.getElementById("spinner"),
        audioElement: document.getElementById("audio-player"),
        playerWrapper: document.getElementById("video-player-wrapper"),
        playerView: document.getElementById("player-view"),
        minimizedPlayer: document.getElementById("minimized-player"),
        minimizeBtn: document.getElementById("minimize-player-btn"),
        exitBtn: document.getElementById("exit-player-btn"),
        channelListHeader: document.getElementById("channel-list-header"),
        loadMoreContainer: document.getElementById("load-more-container"),
        loadMoreBtn: document.getElementById("load-more-btn")
    };

    let player = null;
    let activeStream = null;
    const CHANNELS_PER_PAGE = 50;
    let currentlyDisplayedCount = 0;
    let allStreams = [];
    const isDesktop = () => window.innerWidth >= 1024;
    
    const originalTitle = "Radiowave - Philippine Radio Hub";
    const audioElement = allSelectors.audioElement;

    const setAudioPoster = () => {
        if (!allSelectors.playerWrapper) return;
        const defaultPosterUrl = isDesktop() ? '/logo/desktop-poster.png' : '/logo/attention.png';
        allSelectors.playerWrapper.style.backgroundImage = `url('${defaultPosterUrl}')`;
    };
    
    const setupLayout = () => {
        if (isDesktop()) {
            if (allSelectors.playerView) allSelectors.playerView.classList.add('active');
            if (allSelectors.minimizeBtn) allSelectors.minimizeBtn.style.display = 'none';
            if (allSelectors.minimizedPlayer) allSelectors.minimizedPlayer.classList.remove('active');
        } else {
            if (allSelectors.minimizeBtn) allSelectors.minimizeBtn.style.display = 'flex';
            if (!activeStream && allSelectors.playerView) {
                allSelectors.playerView.classList.remove('active');
            }
        }
    };
    
    const renderMenu = () => {
        allSelectors.floatingMenu.innerHTML = `
        <ul>
            <li><a href="/home/about-us"><span class="material-symbols-outlined">info</span> About Us</a></li>
            <li><a href="/home/faq"><span class="material-symbols-outlined">quiz</span> FAQ</a></li>
            <li><a href="/home/privacy-policy"><span class="material-symbols-outlined">shield</span> Privacy Policy</a></li>
            <li><a href="/home/terms-of-service"><span class="material-symbols-outlined">gavel</span> Terms of Service</a></li>
        </ul>`;

        allSelectors.floatingMenu.querySelectorAll("li").forEach(e => e.addEventListener("click", t => {
            const n = e.querySelector("a");
            if (n) { t.preventDefault(); window.location.href = n.href; }
        }));
    };

    const renderStations = () => {
        const listContainer = allSelectors.channelListingsContainer;
        listContainer.innerHTML = '';
        const listElement = document.createElement('div');
        listElement.className = 'channel-list';
        listContainer.appendChild(listElement);

        allSelectors.channelListHeader.textContent = "All Stations";
        currentlyDisplayedCount = 0;
        loadMoreChannels();
    };

    const loadMoreChannels = () => {
        allSelectors.spinner.style.display = 'flex';
        allSelectors.loadMoreContainer.style.display = 'none';

        setTimeout(() => {
            const listElement = allSelectors.channelListingsContainer.querySelector('.channel-list');
            if (!listElement) return;

            const channelsToRender = allStreams.slice(currentlyDisplayedCount, currentlyDisplayedCount + CHANNELS_PER_PAGE);

            channelsToRender.forEach(stream => {
                const item = document.createElement('div');
                item.className = 'channel-list-item';
                
                const liveSensorIcon = `<span class="material-symbols-outlined">sensors</span>`;

                item.innerHTML = `
                    <div class="channel-info-left">
                        <img src="${stream.logo}" alt="${stream.name} Logo" class="channel-logo" onerror="this.src='/logo/favicon.svg';">
                        <span class="channel-name">${stream.name}</span>
                    </div>
                    <div class="channel-info-right">
                        ${liveSensorIcon}
                    </div>`;

                item.addEventListener('click', () => openPlayer(stream, true));
                
                listElement.appendChild(item);
            });

            currentlyDisplayedCount += channelsToRender.length;
            allSelectors.loadMoreContainer.style.display = currentlyDisplayedCount < allStreams.length ? 'block' : 'none';
            allSelectors.spinner.style.display = 'none';

            if (listElement.children.length === 0) {
                allSelectors.channelListingsContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 50px 0; font-size: 0.85rem;">No stations available.</p>';
            }
        }, 200);
    };

    const setupHeaderScroll = () => { window.addEventListener("scroll", () => allSelectors.header.classList.toggle("scrolled", window.scrollY > 10)); };

    const setupMenuInteractions = () => {
        allSelectors.menuBtn.addEventListener("click", e => { e.stopPropagation(); allSelectors.floatingMenu.classList.toggle("active"); });
        document.addEventListener("click", () => allSelectors.floatingMenu.classList.remove("active"));
        allSelectors.floatingMenu.addEventListener("click", e => e.stopPropagation());
    };

    const setupSlider = () => {
        const slider = document.querySelector(".slider");
        if (!slider) return;
        const slides = slider.querySelectorAll(".slide");
        const dots = slider.parentElement.querySelectorAll(".slider-nav .dot");
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 5000);

        function goToSlide(n) { slides.forEach((s, i) => s.classList.toggle("active", i === n)); dots.forEach((d, i) => d.classList.toggle("active", i === n)); }
        function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; goToSlide(currentSlide); }
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentSlide = index;
                goToSlide(index);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    };
    
    function onErrorEvent(event) {
        console.error('Shaka Player Error:', event.detail);
    }

    async function initPlayer() {
        if (player) return;

        shaka.polyfill.installAll();
        if (shaka.Player.isBrowserSupported()) {
            player = new shaka.Player(audioElement);
            player.addEventListener('error', onErrorEvent);
            setupCustomControls();
        } else {
            console.error('Browser not supported!');
        }
    }
    
    function setupCustomControls() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');

        playPauseBtn.addEventListener('click', () => {
            if (audioElement.paused) audioElement.play();
            else audioElement.pause();
        });

        muteBtn.addEventListener('click', () => {
            audioElement.muted = !audioElement.muted;
        });

        audioElement.addEventListener('play', () => {
            playPauseBtn.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
        });
        audioElement.addEventListener('pause', () => {
            playPauseBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
        });
        audioElement.addEventListener('volumechange', () => {
            muteBtn.innerHTML = audioElement.muted || audioElement.volume === 0
                ? `<span class="material-symbols-outlined">volume_off</span>`
                : `<span class="material-symbols-outlined">volume_up</span>`;
        });
    }
    
    async function openPlayer(stream, shouldBeUnmuted = false) {
        await initPlayer(); 
        activeStream = stream;

        allSelectors.playerWrapper.style.backgroundImage = `url('${stream.logo}')`;

        const mimeType = stream.type; 

        try {
            await player.load(stream.manifestUri, null, mimeType);
            audioElement.muted = !shouldBeUnmuted;
            audioElement.play();

            document.getElementById("player-channel-name").textContent = stream.name;
            document.getElementById("player-channel-category").textContent = "Now Playing";
            document.title = `${stream.name} - Radiowave`;
            
            if (!isDesktop()) {
                allSelectors.playerView.classList.add("active");
                document.getElementById("minimized-player-logo").src = stream.logo;
                document.getElementById("minimized-player-name").textContent = stream.name;
                document.getElementById("minimized-player-category").textContent = "Now Playing";
                allSelectors.minimizedPlayer.classList.remove("active");
            }
            history.pushState({ channel: stream.name }, "", `?play=${encodeURIComponent(stream.name.replace(/\s+/g, "-"))}`);
        } catch (error) {
            onErrorEvent({ detail: error });
        }
    };

   const minimizePlayer = () => {
        if (isDesktop()) return;
        if (allSelectors.playerView.classList.contains("active")) {
            allSelectors.playerView.classList.remove("active");
            setTimeout(() => {
                allSelectors.minimizedPlayer.classList.add("active");
            }, 250);
        }
    };

    const restorePlayer = (e) => {
        if (isDesktop() || e.target.closest("#exit-player-btn")) return;
        if (allSelectors.minimizedPlayer.classList.contains("active")) {
            allSelectors.minimizedPlayer.classList.remove("active");
            allSelectors.playerView.classList.add("active");
            if (audioElement) audioElement.play();
        }
    };

    async function closePlayer(e) {
        e.stopPropagation();

        if (player) {
            await player.unload();
        }
        audioElement.removeAttribute('src');
        activeStream = null;
        setAudioPoster();
        history.pushState({}, "", window.location.pathname);
        document.title = originalTitle;

        if (isDesktop()) {
            document.getElementById('player-channel-name').textContent = 'Station Name';
            document.getElementById('player-channel-category').textContent = 'Now Playing';
        } else {
            allSelectors.playerView.classList.remove("active");
            allSelectors.minimizedPlayer.classList.remove("active");
        }
    };

    async function main() {
        allStreams = radioStations;
        if (allStreams.length === 0) {
            allSelectors.channelListingsContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 50px 0;">Could not load stations.</p>';
            return;
        }

        setAudioPoster();
        setupLayout();
        window.addEventListener('resize', () => {
            setAudioPoster();
            setupLayout();
        });
        
        setupHeaderScroll();
        renderMenu();
        setupMenuInteractions();
        setupSlider();
        renderStations();
        initPlayer();
        
        allSelectors.loadMoreBtn.addEventListener('click', loadMoreChannels);
        allSelectors.minimizeBtn.addEventListener('click', minimizePlayer);
        allSelectors.minimizedPlayer.addEventListener('click', restorePlayer);
        allSelectors.exitBtn.addEventListener('click', closePlayer);
        
        const params = new URLSearchParams(window.location.search);
        const channelToPlay = params.get('play');
        if (channelToPlay) {
            const streamToPlay = allStreams.find(s => s.name.replace(/\s+/g, '-') === channelToPlay);
            if (streamToPlay) {
                openPlayer(streamToPlay, true);
            }
        }
    }

    main();
});
