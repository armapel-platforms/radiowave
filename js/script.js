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
        loadMoreBtn: document.getElementById("load-more-btn"),
        customControls: document.getElementById("custom-controls")
    };

    let player = null;
    let activeStream = null;
    const CHANNELS_PER_PAGE = 50;
    let currentlyDisplayedCount = 0;
    let allStreams = [];
    const isDesktop = () => window.innerWidth >= 1024;
    
    const originalTitle = "Wave - Listen to Your Favorite Radio Stations";
    const audioElement = allSelectors.audioElement;

    const setAudioPoster = () => {
        if (!allSelectors.playerWrapper) return;
        const defaultPosterUrl = isDesktop() ? '/logo/desktop-poster.png' : '/logo/attention.png';
        allSelectors.playerWrapper.style.backgroundImage = `url('${defaultPosterUrl}')`;
        allSelectors.playerWrapper.style.backgroundColor = '#000000';
    };
    
    const setupLayout = () => {
        if (allSelectors.customControls && !activeStream) {
            allSelectors.customControls.style.display = 'none';
        }
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
        allSelectors.floatingMenu.querySelectorAll("li").forEach(e=>e.addEventListener("click",t=>{const n=e.querySelector("a");if(n){t.preventDefault();window.location.href=n.href}}));
    };

    const renderStations = () => {
        const listContainer = allSelectors.channelListingsContainer;
        if (!listContainer) return;
        listContainer.innerHTML = '';
        const listElement = document.createElement('div');
        listElement.className = 'channel-list';
        listContainer.appendChild(listElement);
        allSelectors.channelListHeader.textContent = "All Stations";
        currentlyDisplayedCount = 0;
        loadMoreChannels();
    };

    const loadMoreChannels = () => {
        if (allSelectors.spinner) allSelectors.spinner.style.display = 'flex';
        if (allSelectors.loadMoreContainer) allSelectors.loadMoreContainer.style.display = 'none';
        setTimeout(() => {
            const listElement = allSelectors.channelListingsContainer.querySelector('.channel-list');
            if (!listElement) return;
            const channelsToRender = allStreams.slice(currentlyDisplayedCount, currentlyDisplayedCount + CHANNELS_PER_PAGE);
            channelsToRender.forEach(stream => {
                const item = document.createElement('div');
                item.className = 'channel-list-item';
                item.innerHTML = `<div class="channel-info-left"><img src="${stream.logo}" alt="${stream.name} Logo" class="channel-logo" onerror="this.src='/logo/favicon.svg';"><span class="channel-name">${stream.name}</span></div><div class="channel-info-right"><span class="material-symbols-outlined">sensors</span></div>`;
                item.addEventListener('click', () => openPlayer(stream, true));
                listElement.appendChild(item);
            });
            currentlyDisplayedCount += channelsToRender.length;
            if (allSelectors.loadMoreContainer) {
                allSelectors.loadMoreContainer.style.display = currentlyDisplayedCount < allStreams.length ? 'block' : 'none';
            }
            if (allSelectors.spinner) allSelectors.spinner.style.display = 'none';
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
        const slides = slider.querySelectorAll(".slide"), dots = slider.parentElement.querySelectorAll(".slider-nav .dot");
        let currentSlide = 0, slideInterval = setInterval(nextSlide, 5000);
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
    
    function onErrorEvent(event) { console.error('Shaka Player Error:', event.detail); }

    async function initPlayer() {
        if (player) return;
        shaka.polyfill.installAll();
        if (shaka.Player.isBrowserSupported()) {
            player = new shaka.Player(audioElement);
            player.addEventListener('error', onErrorEvent);
            setupCustomControls();
        } else { console.error('Browser not supported!'); }
    }
    
    function setupCustomControls() {
        const playPauseBtn = document.getElementById('play-pause-btn'), muteBtn = document.getElementById('mute-btn');
        if (!playPauseBtn || !muteBtn) return;
        playPauseBtn.addEventListener('click', () => { if (audioElement.paused) audioElement.play(); else audioElement.pause(); });
        muteBtn.addEventListener('click', () => { audioElement.muted = !audioElement.muted; });
        audioElement.addEventListener('play', () => { playPauseBtn.innerHTML = `<span class="material-symbols-outlined">pause</span>`; });
        audioElement.addEventListener('pause', () => { playPauseBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`; });
        audioElement.addEventListener('volumechange', () => { muteBtn.innerHTML = audioElement.muted || audioElement.volume === 0 ? `<span class="material-symbols-outlined">volume_off</span>` : `<span class="material-symbols-outlined">volume_up</span>`; });
    }
    
    async function openPlayer(stream, shouldBeUnmuted = false) {
        await initPlayer(); 
        activeStream = stream;
        try {
            const response = await fetch(`/api/getManifest?name=${encodeURIComponent(stream.name)}`);
            if (!response.ok) throw new Error(`Failed to fetch manifest: ${response.statusText}`);
            const { manifestUri } = await response.json();
            if (!manifestUri) throw new Error(`Manifest URI not found for ${stream.name}`);
            
            if (allSelectors.customControls) allSelectors.customControls.style.display = 'flex';
            
            allSelectors.playerWrapper.style.backgroundImage = `url('${stream.logo}')`;
            allSelectors.playerWrapper.style.backgroundColor = '#ffffff';

            await player.load(manifestUri, null, stream.type);
            audioElement.muted = !shouldBeUnmuted;
            audioElement.play();
            document.getElementById("player-channel-name").textContent = stream.name;
            document.getElementById("player-channel-category").textContent = "Now Playing";
            document.title = `${stream.name} - Wave`;
            
            if (!isDesktop()) {
                allSelectors.playerView.classList.add("active");
                document.getElementById("minimized-player-logo").src = stream.logo;
                document.getElementById("minimized-player-name").textContent = stream.name;
                document.getElementById("minimized-player-category").textContent = "Now Playing";
                allSelectors.minimizedPlayer.classList.remove("active");
            }
            history.pushState({ channel: stream.name }, "", `/home?play=${encodeURIComponent(stream.name.replace(/\s+/g, "-"))}`);
        } catch (error) {
            console.error("Error opening player:", error);
            onErrorEvent({ detail: error }); 
        }
    };

    const minimizePlayer = () => {
        if (isDesktop() || !allSelectors.playerView) return;
        if (allSelectors.playerView.classList.contains("active")) {
            allSelectors.playerView.classList.remove("active");
            setTimeout(() => { if (allSelectors.minimizedPlayer) allSelectors.minimizedPlayer.classList.add("active"); }, 250);
        }
    };
    const restorePlayer = (e) => {
        if (isDesktop() || e.target.closest("#exit-player-btn") || !allSelectors.minimizedPlayer) return;
        if (allSelectors.minimizedPlayer.classList.contains("active")) {
            allSelectors.minimizedPlayer.classList.remove("active");
            if (allSelectors.playerView) allSelectors.playerView.classList.add("active");
            if (audioElement) audioElement.play();
        }
    };
    async function closePlayer(e) {
        e.stopPropagation();
        if (player) await player.unload();
        audioElement.removeAttribute('src');
        activeStream = null;
        setAudioPoster();
        if (allSelectors.customControls) allSelectors.customControls.style.display = 'none';
        history.pushState({}, "", window.location.pathname);
        document.title = originalTitle;
        if (isDesktop()) {
            document.getElementById('player-channel-name').textContent = 'Station Name';
            document.getElementById('player-channel-category').textContent = 'Now Playing';
        } else {
            if (allSelectors.playerView) allSelectors.playerView.classList.remove("active");
            if (allSelectors.minimizedPlayer) allSelectors.minimizedPlayer.classList.remove("active");
        }
    };

    const fetchStations = async () => {
        try {
            const response = await fetch('/api/getStations');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch stations:', error);
            return [];
        }
    };

    async function main() {
        allStreams = await fetchStations();
        window.radioStations = allStreams;
        document.dispatchEvent(new CustomEvent('stationsLoaded'));
        if (allSelectors.channelListingsContainer && allStreams.length === 0) {
            allSelectors.channelListingsContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 50px 0;">Could not load stations.</p>';
            if (allSelectors.spinner) allSelectors.spinner.style.display = 'none';
        }
        setAudioPoster();
        setupLayout();
        
        window.addEventListener('resize', () => {
            if (!activeStream) {
                setAudioPoster();
            }
            setupLayout();
        });
        
        setupHeaderScroll();
        renderMenu();
        setupMenuInteractions();
        setupSlider();
        if (allSelectors.channelListingsContainer) renderStations();
        initPlayer();
        if(allSelectors.loadMoreBtn) allSelectors.loadMoreBtn.addEventListener('click', loadMoreChannels);
        if(allSelectors.minimizeBtn) allSelectors.minimizeBtn.addEventListener('click', minimizePlayer);
        if(allSelectors.minimizedPlayer) allSelectors.minimizedPlayer.addEventListener('click', restorePlayer);
        if(allSelectors.exitBtn) allSelectors.exitBtn.addEventListener('click', closePlayer);
        
        const params = new URLSearchParams(window.location.search);
        const channelToPlay = params.get('play');
        if (channelToPlay) {
            const streamToPlay = allStreams.find(s => s.name.replace(/\s+/g, '-') === channelToPlay);
            if (streamToPlay) openPlayer(streamToPlay, true);
        }
    }

    main();
});
