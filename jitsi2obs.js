var obs2jitsi = {
    hide_nonvideo: false,                       // only show video participants in tile view
    hide_avatar: true,                          // hide avatar circle
    participant_border: "2px solid #B239FF",    // border in tile view
    background_type: "transparent",             // "transparent" or "image" if background_image
    // background_image: "/images/branding/720p_background_plain.jpg", // only works on same server due to CSP
    hide_elements: [
        ".watermark", ".filmstrip__toolbar", ".large-video-labels",
        "#new-toolbox", "videoconference_page .subject", ".videocontainer > .subject",
        ".atlaskit-portal div", "#filmstripLocalVideo",
        "#localVideoTileViewContainer", "span.videocontainer > span", ".subject",
        ".indicator-container", // hide status indicator box
        ".vertical-filmstrip div.filmstrip" // hide sidebar filmstrip when in sidebar
    ]
}

// END EDIT SECTION

$(document).ready(function() {
    $('div.prejoin-preview-dropdown-container div.action-btn').click(); // skip prejoin page, if enabled
    $('body').append("<style>" + obs2jitsi.hide_elements.join(", ") + " {display: none !important}</style>");
    $('body').append('<style>.active-speaker {box-shadow: none !important}</style>');
    
    if (obs2jitsi.hide_nonvideo) {
        $('body').append('<style>.display-avatar-only {display: none !important}</style>');
    }
    if (obs2jitsi.hide_avatar) {
        $('body').append('<style>#dominantSpeakerAvatarContainer {display: none !important}</style>');
    }
    if (obs2jitsi.background_type == "image" & obs2jitsi.background_image) {
        $("#largeVideoContainer").css({
            "background-image": "url('" + obs2jitsi.background_image + "')",
            "background-size": "cover",
            "background-repeat": "no-repeat"
        });
    }
    if (obs2jitsi.background_type == "transparent") {
        $('body').append('<style>body, #largeVideoContainer, #react > div, .tile-view #largeVideoContainer {background-color: transparent !important}</style>')
    }
    if (obs2jitsi.participant_border) {
        $('body').append('<style>.remote-videos-container > .videocontainer {border: '+obs2jitsi.participant_border+' !important}</style>');
    }

    obs_jitsi_connected = function(){
        APP.conference.localAudio.mute();
        APP.UI.toggleFilmstrip(); // hide filmstrip
        //$(".filmstrip__toolbar > button").click();
    }
    obs_wait_connected = function(){
        try {
            if (APP.conference._room.xmpp.connection.connected == true) {
                obs_jitsi_connected();
            } else { throw "";}
        } catch(e) {setTimeout(obs_wait_connected, 500);}
    };
    obs_wait_connected();
});
