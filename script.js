// Function to load video
function loadVideo(src, title, container) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';

    const video = document.createElement('video');
    video.controls = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.poster = 'incredibox-sprunki.jpg';

    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';

    video.appendChild(source);
    videoContainer.appendChild(video);

    const titleP = document.createElement('p');
    titleP.textContent = title;

    videoItem.appendChild(videoContainer);
    videoItem.appendChild(titleP);

    container.appendChild(videoItem);

    video.onerror = function() {
        console.error('Error loading video:', src, video.error);
    };

    video.onloadeddata = function() {
        console.log('Video loaded successfully:', src);
    };
}

// List of videos
const videos = [
    { src: "87%20(incredibox%20sprunki)%20(twblood).mp4", title: "87 (incredibox sprunki) (twblood)" },
    { src: "BULLSEYE_Incredibox_Sprunki_mix.mp4", title: "BULLSEYE Incredibox Sprunki mix" },
    { src: "F.U.N%20-%20A%20Sprunki%20Mix%20(Incredibox).mp4", title: "F.U.N - A Sprunki Mix (Incredibox)" },
    { src: "FW%20put%20the%20knife%20away%20sprunki.mp4", title: "FW put the knife away sprunki" },
    { src: "Gray%20s%20HIDEAWAY%20*%20Incredibox%20Sprunki%20mix%20*%20READ%20DESCRIPTION.mp4", title: "Gray s HIDEAWAY * Incredibox Sprunki mix * READ DESCRIPTION" },
    { src: "Incredibox%20Sprunki%20-%20They%20are%20not%20real..mp4", title: "Incredibox Sprunki - They are not real." },
    { src: "Playing%20Sprunki%20for%20the%20first%20time%20O3O%20%23incredibox%20%23sprunki%20%23incrediboxmod.mp4", title: "Playing Sprunki for the first time O3O #incredibox #sprunki #incrediboxmod" },
    { src: "Sprunki%20Mix%20-%20_%20-%20Hello!%20%5BIncredibox%5D.mp4", title: "Sprunki Mix - _ - Hello! [Incredibox]" },
    { src: "Sprunki%20Mix%20_%20Traveling%20The%20Unknown.mp4", title: "Sprunki Mix _ Traveling The Unknown" },
    { src: "Sprunki%20Mix_%20FUN%20adventure.mp4", title: "Sprunki Mix_ FUN adventure" },
    { src: "Sprunki%20but%20too%20kID%20frIEndly%20animation%20tw%20gore%20and%20blood.mp4", title: "Sprunki but too kID frIEndly animation tw gore and blood" },
    { src: "Sprunki%20mix%20cause%20I%20love%20it.mp4", title: "Sprunki mix cause I love it" },
    { src: "Sprunki.mp4", title: "Sprunki" },
    { src: "TW_%20RACISM%20SIMON%20GETS%20VIOLATED%20__%20Incredibox%20Sprunki.mp4", title: "TW_ RACISM SIMON GETS VIOLATED __ Incredibox Sprunki" },
    { src: "The%20teachings%20of%20Mr.%20Tree!%20-%20an%20incredibox%20Sprunki%20mix.mp4", title: "The teachings of Mr. Tree! - an incredibox Sprunki mix" },
    { src: "untitled%20sprunki%20mix.mp4", title: "untitled sprunki mix" },
    { src: "wenda%20teaches%20math%20(incredibox%20sprunki).mp4", title: "wenda teaches math (incredibox sprunki)" }
];

// Function to initialize the page
function initPage() {
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid) {
        // Load each video
        videos.forEach(video => {
            loadVideo(video.src, video.title, videoGrid);
        });
    }

    // Add event listener for "Share Your Creation" button
    const shareButton = document.querySelector('button');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            alert('Feature coming soon: Upload and showcase your Sprunki creations directly on our website!');
        });
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPage);
