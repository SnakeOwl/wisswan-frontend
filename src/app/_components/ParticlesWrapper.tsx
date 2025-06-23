"use client"
import particlesConfig from "@/configs/particles.json"
import React, { useEffect } from "react";
import particlesJS from "@/libs/particles_custom"

// Чёт эта библиотека требовательная к ресурсам. От неё даже комп начинает гудеть.
// lib такая тяжёлая, что с включенным движением частиц, даже анимация кнопок тормозит.
const ParticlesWrapper = React.memo(({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // переключение между темами на устройстве
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', ({ matches }) => {
                if (matches) {
                    // dark theme
                    particlesConfig.particles.color.value = "#fff";
                    particlesConfig.particles.line_linked.color = "#fff";
                    particlesConfig.particles.shape.type = "star";
                    particlesConfig.particles.number.value = 80;
                } else {
                    // light theme
                    particlesConfig.particles.number.value = 0;
                }
                particlesJS('particles-js', particlesConfig);
            })



        // initialisation
        if (window.matchMedia('(prefers-color-scheme: dark)').matches !== true) {
            // light theme
            particlesConfig.particles.number.value = 0;
            particlesConfig.particles.move.enable = false;
        } else {
            // for dark theme
            particlesConfig.particles.color.value = "#fff"
            particlesConfig.particles.line_linked.color = "#fff";
            particlesConfig.particles.shape.type = "star";
            particlesConfig.particles.number.value = 80;
        }

        // на мобилках количество частиц должно быть намного меньше
        if (window.screen.width < 640) {
            particlesConfig.particles.number.value = 16;
        }

        particlesJS('particles-js', particlesConfig);

    }, []);


    return (
        <>
            <div className="fixed top-0 w-full h-screen z-10" id="particles-js"></div>
            <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full">
                {children}
            </div>
        </>
    )
})


ParticlesWrapper.displayName = "ParticlesWrapper";

export default ParticlesWrapper;
