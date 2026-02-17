import Hero_image from "../../../src/assets/pannel/images/cask--image.svg";
import { PinContainer } from "../../components/ui/acertinity/AnimatePin.tsx";
import React, { useState, useEffect } from "react";
import "./pannel.scss";

import ShiftingCountdown from "./components/CountDownTimer.jsx";
import CompanyTemplate from "./components/CompanyTemplate.tsx";
import PannelNav from "./components/PannelNav.jsx";
import Footer from "../../components/Footer.jsx";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import ansut from "../../assets/pannel/images/ansut.png";
import i1 from "../../assets/pannel/images/i1.svg";
import i2 from "../../assets/pannel/images/i2.svg";
import i3 from "../../assets/pannel/images/i3.svg";
import i4 from "../../assets/pannel/images/i4.svg";
import i5 from "../../assets/pannel/images/i5.svg";
import i6 from "../../assets/pannel/images/i6.svg";

export default function PannelView() {
  const [numberPannelist, setNumberPannelist] = useState(3);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numberPannelist,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  let pannelist = [
    {
      name: "Nom Modérateur",
      role: "Modérateur du pannel",
      image:
        "",
    },
    {
      name: "Nom Panéliste 1",
      role: "Panéliste",
      image: "",
    },
    {
      name: "Nom Panéliste 2",
      role: "Panéliste",
      image:
        "",
    },
    {
      name: "Nom Panéliste 3",
      role: "Panéliste",
      image: "",
    },
  ];

  let companies = [
    {
      name: "H-FabLab",
      image: "https://h-fablab.org/images/Xl.jpg",
    },
    {
      name: "Rotaract Club Abidjan",
      image:
        "https://scontent.fabj3-2.fna.fbcdn.net/v/t39.30808-6/358694408_275081481867597_7339439375121264508_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=iAt9RJvNSTsAX8Av8OQ&_nc_ht=scontent.fabj3-2.fna&oh=00_AfB7avUyslxEufPd6PPiM4gVP3htedfBT947DaaUzZiviA&oe=65E6C04A",
    },
  ];

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">House in the woods</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a
          peaceful escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };

  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">House above the clouds</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and
          a unique living experience. It&apos;s a place where the sky meets
          home, and tranquility is a way of life.
        </p>
      </div>
    );
  };

  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">Greens all over</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };

  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold text-4xl text-white">Rivers are serene</p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s
          the perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };

  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail: i1,
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail: i2,
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail: i3,
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail: i4,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    console.log(windowSize);

    if (windowSize.width >= 700) {
      setNumberPannelist(3);
    }
    if (windowSize.width < 1355 && windowSize.width >= 700) {
      setNumberPannelist(2);
    }
    if (windowSize.width < 870) {
      setNumberPannelist(1);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <div className="Pannel--container">
      <PannelNav />

      <section className="hero--section relative py-0 md:py-24 text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Bienvenue au{" "}
              <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                Salon
              </mark>{" "}
              de l&apos;innovation
            </h1>

            <p className="mb-8 leading-relaxed">
              Rejoignez dès à présent l’univers passionnant du salon de
              l’innovation à l’ESATIC. Un évênement panaché entre découverte,
              célébration des TIC et formation. C&apos;est l&apos;occasion rêvée
              pour vous d&apos;agrandir votre réseau de connaissance.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                commencer
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded h-[22rem]"
              alt="hero"
              src={Hero_image}
            />
          </div>
        </div>
      </section>

      <section id="start" className="start--section bg-[#303030] mt-9 px-4">
        <div className="container">
          <div className="w-full mb-9">
            <h1 className="mb-4 text-3xl font-extrabold text-center text-white dark:text-white md:text-5xl lg:text-6xl">
              Introduction au{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                {" "}
                Salon de l&apos;Innovation
              </span>{" "}
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base text-white text-center">
              Le salon de l&apos;innovation, porté par le C2E, offre une
              plateforme à des entreprises, des start-ups et des étudiants pour
              exposer des projets novateurs dans le domaine des TIC. II
              constitue également un espace de réflexion collective en vue de
              proposer des solutions potentielles visant à faciliter
              l&apos;intégration du numérique partout en Côte d&apos;Ivoire
            </p>
          </div>

          <div className="w-full text-center">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-white md:text-4xl dark:text-white">
              Début du{" "}
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 mb-9">
                Pannel dans...
              </span>
            </h1>

            <ShiftingCountdown />
          </div>
        </div>
      </section>

      <section id="pannel" className="pannel--section mb-32 py-24 px-4">
        <div className="container">
          <div className="pannelist">
            <div className="pannelist--letf">
              <h1 className="mb-4 text-2xl font-medium leading-none tracking-tight text-gray-400 dark:text-white">
                Thème du{" "}
                <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                  Pannel
                </span>
              </h1>
            </div>
            <div className="pannelist--right">
              <p className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-4xl  dark:text-white">
                LE DIGITAL DANS LE QUOTIDIEN DES IVOIRIENS : ENJEUX POUR LA
                COMPETITIVITE DE LA COTE D&apos;IVOIRE SUR LE PLAN AFRICAIN
              </p>
            </div>
          </div>

          <div className="mt-11">
            <Slider {...settings} className="container--slider rounded-lg">
              {pannelist.map((item, index) => (
                <div
                  className="w-[400px] h-[500px] sub--container--slider mb-4"
                  key={index}
                >
                  <div className="w-[390px] mx-auto rounded-lg bg-gray-900 p-4">
                    <p className="pb-2 text-base font-bold text-white">
                      {item.name}
                    </p>
                    <p className="pb-2 text-base font-bold text-gray-400">
                      {item.role}
                    </p>
                    <img
                      src={item.image}
                      className="rounded-lg h-[400px] w-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section
        id="companies"
        className="companies--section bg-[#303030] mt-9 px-4"
      >
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white text-center lg:w-1/3 lg:mb-0 mb-9">
          Entreprises partenaires
        </h1>
        <div className="max-w-[650px] flex flex-wrap justify-center gap-9 mt-9">
          {companies.map((item, index) => (
            <div key={index} className="mx-auto">
              <CompanyTemplate url={item.image} name={item.name} />
            </div>
          ))}
        </div>
      </section>

      <div className="h-[40rem] w-full flex items-center justify-center">
        <PinContainer title="Carte de l'ESATIC" href="#">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[30rem] h-[30rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              Carte de l&apos;ESATIC
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">
                Aidez vous de cette carte pour vous repérer dans l&apos;école.
              </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
              <img
                src="https://img.freepik.com/free-vector/complex-university-buildings-with-football-field-green-trees-benches-walkways-isometric-layout-vector-illustration_1284-19911.jpg?w=1480&t=st=1709243345~exp=1709243945~hmac=9dbba289552acff515011c865370c151cf16b974cb0c3f028a81f5b2e6bda591"
                className="rounded-lg"
              />
            </div>
          </div>
        </PinContainer>
      </div>

      <section
        id="sponsors"
        className="sponsors flex flex-col items-center gap-9"
      >
        <h1 className="text-blue-700 text-center text-[1.7em] font-medium">
          Sponsors
        </h1>
        <img
          src={ansut}
          className="h-[80px] w-[230px] w-auto object-cover"
          alt=""
        />
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
              Gallerie de la JETIC 2026
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              La JETIC fut un moment pour chaque étudiant, de partage
              d&apos;expériences, de vécu, mais aussi un moment permettant à
              chacun d&apos;agrandir son réseau de connaissance. Par la même
              occasion elle a permis à bon nombre d&apos; entreprise de se faire
              connaitre mais aussi de dénicher des talents parmis les ésaticiens
              pour des stages et mêmes de potentiels contrats de travail.
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={i1}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={i2}
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={i3}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={i4}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={i5}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={i6}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
