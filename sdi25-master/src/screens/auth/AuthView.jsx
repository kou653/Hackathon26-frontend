// import particlesConfig from "../../assets/particles/particles";
import logoSdi1 from "../../assets/images/innovationRoom.png";
import logoSdi2 from "../../assets/images/innovationWeek.png";
import LinkButton from "../../components/ui/LinkButton.tsx";
import logoSdi3 from "../../assets/images/jetic.png";
import React from "react";

import logoSdi_1 from "../../assets/images/logoHackathon-PhotoRoom.png";
import logoSdi_2 from "../../assets/images/logoHackathon-PhotoRoom2.png";
import logoSdi_3 from "../../assets/images/logoSDI-PhotoRoom.png";
import logoSdi_4 from "../../assets/images/logoEsatic.png";
import logoSdi_5 from "../../assets/images/logoC2E.jpg";
import TextTransition, { presets } from "react-text-transition";
import Marquee from "react-fast-marquee";
import { useEffect } from "react";

export default function AuthView() {
  const TEXTS = ["Notre SDI", "Notre Jetic", "Notre Hackathon"];
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  const TEXTS2 = ["Votre talent", "Votre savoir faire", "Votre savoir faire"];
  const [index2, setIndex2] = React.useState(0);

  useEffect(() => {
    const intervalId2 = setInterval(
      () => setIndex2((index2) => index2 + 1),
      3000
    );
    return () => clearTimeout(intervalId2);
  }, []);

  return (
    <div className="w-full">
      <section className="md:py-24 py-11 relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
        <div className="p-4 w-full text-center">
          <h1 className="text-gray-700 font-black xl:text-6xl text-5xl hero--title flex xl:flex-row flex-col  justify-center items-center gap-4">
            Bienvenue sur
            <TextTransition direction="down" springConfig={presets.wobbly}>
              <span className="bg-gradient-to-b from-cyan-700 to-blue-400 bg-clip-text text-transparent">
                {" #"}
                {TEXTS[index % TEXTS.length]}
              </span>
            </TextTransition>
          </h1>
          <h1 className="text-gray-700 mt-24 md:mt-4 font-black xl:text-6xl text-5xl hero--title flex xl:flex-row flex-col items-center justify-center gap-4">
            Démontrez nous
            <TextTransition springConfig={presets.wobbly}>
              <span className="bg-gradient-to-b from-cyan-800 to-blue-400 bg-clip-text text-transparent">
                {" "}
                {TEXTS2[index2 % TEXTS2.length]}
              </span>
            </TextTransition>
          </h1>
          <p className="mt-16 text-gray-500 max-w-xl mx-auto text-[14px] text-base font-medium">
            La SDI est l&apos;un des événements phares de l&apos;ESATIC qui
            permet à chaque étudiant de faire montre de son savoir mais aussi de
            promouvoir les TIC.
          </p>
          <div className="flex justify-center gap-4 mt-11">
            <LinkButton
              label="Connexion"
              type="button"
              route="/hackathon/auth/LogInView"
            />
            <LinkButton
              label="Inscription"
              type="button"
              route="/hackathon/auth/SignInView"
            />
            {/* <LinkButton
              label="Jeu"
              type="button"
              route="/hackathon/game/GameCountView"
            /> */}
          </div>
          <div className="mt-28 max-w-[900px] mx-auto ">
            <Marquee className="w-5/6 text-white text-xl mt-24">
              <img src={logoSdi_1} className="mx-24 h-[80px]" />
              <img src={logoSdi_2} className="mx-24 h-[80px]" />
              <img src={logoSdi_3} className="mx-24 h-[80px]" />
              <img src={logoSdi_4} className="mx-24 h-[50px]" />
              <img src={logoSdi_5} className="mx-24 h-[50px]" />
            </Marquee>
          </div>
        </div>
        <div className="mt-32 xl:mt-0"></div>
      </section>

      <div className="flex flex-wrap -m-4 mx-auto justify-center">
        <div className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-gray-700 p-6 rounded-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={logoSdi2}
              alt="content"
            />
            <h3 className="tracking-widest text-white text-xs font-medium title-font">
              Évênement
            </h3>
            <h2 className="text-lg text-white font-medium title-font mb-4">
              Semaine de l&apos;innovation
            </h2>
            <p className="leading-relaxed text-base text-white">
              La semaine de l&apos;innovation est une semaine de promotion et de
              valorisation des TIC.
            </p>
          </div>
        </div>
        <div className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-gray-700 p-6 rounded-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={logoSdi1}
              alt="content"
            />
            <h3 className="tracking-widest text-white text-xs font-medium title-font">
              Évênement
            </h3>
            <h2 className="text-lg text-white font-medium title-font mb-4">
              Salon de l&apos;innovation
            </h2>
            <p className="leading-relaxed text-base text-white">
              Le salon de l&apos;innovation est une conférence portant sur des
              thématiques d&apos;actualité.
            </p>
          </div>
        </div>
        <div className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-gray-700 p-6 rounded-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={logoSdi3}
              alt="content"
            />
            <h3 className="tracking-widest text-white text-xs font-medium title-font">
              Évênement
            </h3>
            <h2 className="text-lg text-white font-medium title-font mb-4">
              Jetic
            </h2>
            <p className="leading-relaxed text-base text-white">
              La JETIC est une cérémonie de célébration et de récompense aux
              vainqueurs du hackathon.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-32"></div>
    </div>
  );
}
