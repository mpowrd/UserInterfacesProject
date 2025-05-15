import React, {useEffect, useRef, useState} from 'react';
import {useSettings} from "../SettingsProvider";

const YouTubePlayer = ({ videoId, startTime = 30 , setVideoDisplayed}) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const playerInitializedRef = useRef(false);
    const completedRef = useRef(false);

    const { volume } = useSettings();

    // Keep track of all timers to clear them if needed
    const timersRef = useRef([]);

    // Create a unique container ID
    const containerId = `youtube-container-${videoId}-${startTime}`;

    useEffect(() => {
        // Ensure the container exists in the DOM
        const container = document.getElementById(containerId);
        if (!container) return;

        // Load the YouTube API if it's not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Create an overlay for fading
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '10';
        overlay.style.transition = 'opacity 1s ease';
        overlay.style.opacity = '1';
        container.appendChild(overlay);

        // Create a placeholder for YouTube iframe
        const playerPlaceholder = document.createElement('div');
        playerPlaceholder.id = `youtube-player-${videoId}-${startTime}`;
        playerPlaceholder.style.width = '100%';
        playerPlaceholder.style.height = '100%';
        container.appendChild(playerPlaceholder);

        // Function to initialize YouTube player
        const initPlayer = () => {
            if (playerInitializedRef.current || completedRef.current) return;

            playerRef.current = new window.YT.Player(`youtube-player-${videoId}-${startTime}`, {
                videoId: videoId,
                playerVars: {
                    start: startTime,
                    autoplay: 1,
                    cc_load_policy: 1,   // fuerza que los subtítulos aparezcan al iniciar
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                    disablekb: 1,
                    mute: 1 // Start muted
                },
                events: {
                    'onReady': onPlayerReady
                }
            });

            playerInitializedRef.current = true;
        };

        // Handler for when player is ready
        function onPlayerReady(event) {
            if (completedRef.current) return;

            // Wait before fading in the video
            const fadeInTimer = setTimeout(() => {
                overlay.style.opacity = '0';

                // Unmute and fade in audio
                if (playerRef.current) {
                    playerRef.current.unMute();
                    playerRef.current.setVolume(0);

                    let vol = 0;
                    const fadeInInterval = setInterval(() => {
                        if (completedRef.current) {
                            clearInterval(fadeInInterval);
                            return;
                        }

                        vol += 5;
                        if (vol <= volume && playerRef.current) {
                            playerRef.current.setVolume(vol);
                        } else {
                            clearInterval(fadeInInterval);
                        }
                    }, 100);
                    timersRef.current.push(fadeInInterval);
                }

                // Play for specified duration then fade out
                const fadeOutTimer = setTimeout(() => {
                    if (completedRef.current) return;

                    // Fade out audio
                    let vol = volume;
                    const fadeOutInterval = setInterval(() => {
                        if (completedRef.current) {
                            clearInterval(fadeOutInterval);
                            return;
                        }

                        vol -= 5;
                        if (vol >= 0 && playerRef.current) {
                            playerRef.current.setVolume(vol);
                        } else {
                            clearInterval(fadeOutInterval);
                        }
                    }, 100);
                    timersRef.current.push(fadeOutInterval);

                    // Fade in the black overlay
                    overlay.style.opacity = '1';

                    // After fade out, stop the video and show completion message
                    const completeTimer = setTimeout(() => {
                        if (completedRef.current) return;
                        completedRef.current = true;

                        if (playerRef.current) {
                            playerRef.current.pauseVideo();
                        }

                        // Show completion message
                        container.innerHTML = '';
                        setVideoDisplayed(true);

                    }, 1000);
                    timersRef.current.push(completeTimer);

                }, 10000); // 10 seconds playback
                timersRef.current.push(fadeOutTimer);

            }, 5000); // 5 seconds initial delay
            timersRef.current.push(fadeInTimer);
        }

        // Initialize player when API is ready
        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            // Set up global callback for when API loads
            const originalCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (originalCallback) originalCallback();
                initPlayer();
            };
        }

        // Cleanup function
        return () => {
            // Clear all timers
            timersRef.current.forEach(timerId => clearTimeout(timerId));
            timersRef.current = [];

            // Mark as completed to prevent further operations
            completedRef.current = true;

            // Important: Don't destroy the player, just pause it
            if (playerRef.current && playerRef.current.pauseVideo) {
                playerRef.current.pauseVideo();
            }
        };
    }, [videoId, startTime, containerId]);

    // Render a simple container that won't be modified by React after mounting
    return (
        <div
            id={containerId}
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                pointerEvents: 'none'
            }}
        />
    );
};

export default YouTubePlayer;