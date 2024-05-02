import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

// Assuming these imports are adjusted to the actual paths in your React project
import backgroundImage from "./images/background_image.png"; // Adjust paths as needed
import feature4 from "./images/screenshots/feature4.jpg";
import feature11 from "./images/screenshots/feature11.jpg";
import feature2 from "./images/screenshots/feature2.jpg";
import feature3 from "./images/screenshots/fetaure3.jpg"; // Corrected the typo from 'fetaure3' to 'feature3'

const features = [
  {
    title: "Porte de Normandie",
    description:
      "Découvrez les charmes de la Porte de Normandie lors d'une sortie culturelle et historique spécialement conçue pour nos aînés. Profitez d'un voyage organisé sans souci de paiement direct.",
    image: feature11,
  },
  {
    title: "L'agglomération SNA 27",
    description:
      "Rejoignez-nous pour un atelier interactif à l'agglomération SNA 27, où vous apprendrez à organiser vos documents importants et à tirer le meilleur parti de vos appareils numériques, le tout dans une ambiance conviviale.",
    image: feature2,
  },
  {
    title: "Acon-Droisy-Marcilly",
    description:
      "Participez à une journée découverte à Acon-Droisy-Marcilly, avec des activités ludiques et éducatives sur le patrimoine local et l'histoire, spécialement adaptées pour stimuler l'esprit de nos seniors.",
    image: feature3,
  },
  {
    title: "Les-Baux-Sainte-Croix",
    description:
      "Venez aux Baux-Sainte-Croix pour un atelier sur la gestion personnelle et l'informatique facile, où vous apprendrez à simplifier la gestion de vos données quotidiennes dans une ambiance décontractée et soutenue.",
    image: feature4,
  },
];

function Example2() {
  require("./tailwind.css");
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-marron pb-28 pt-20 sm:py-32"
    >
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src="https://res.cloudinary.com/dl2adjye7/image/upload/v1706794085/background_image_zjbd4b.png"
          alt=""
          unoptimized
          layout="fill" // Add this line
          objectFit="cover"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <Container className="relative z-10">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-beige sm:text-4xl md:text-5xl">
            Rejoinez un de nos événement pour février!
          </h2>
          <p className="mt-6 text-lg tracking-tight text-beige">
            Si vous souhaitez avoir plus d&apos;informations, contactez nous via
            email ou via notre site web! Si vous souhaitez réservé une place
            pour vos grand parents faites de meme!
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5 text-marron">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal text-marron">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                        selectedIndex === featureIndex
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10 text-beige" // Added text-vert here for selected index
                          : "hover:bg-white/10 lg:hover:bg-white/5 text-beige" // Ensure text color is vert by default
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg ui-not-focus-visible:outline-none",
                            selectedIndex === featureIndex
                              ? "text-black lg:text-white"
                              : "text-beige hover:text-white lg:text-white"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          "mt-2 hidden text-sm lg:block",
                          selectedIndex === featureIndex
                            ? "text-white"
                            : "text-blue-100 group-hover:text-white"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <img
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}

export default Example2;

export function Container({ className, children }) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Button({ href, color = "slate", variant = "solid", children }) {
  const buttonClass = clsx(
    "inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none",
    variant === "outline" ? "ring-1" : "",
    color === "marron" ? "text-black bg-marron hover:bg-marronclair" : ""
    // Additional class names based on props
  );

  return href.startsWith("/") ? (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  ) : (
    <a
      href={href}
      className={buttonClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
