"use client";
import { worldCountries } from "@/utils/constants/worldCountries";
import { ResponsiveChoropleth } from "@nivo/geo";
import React from "react";

const MyResponsiveChoropleth = (data: any) => {
  return (
    <ResponsiveChoropleth
      data={data}
      features={worldCountries.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
        {
          id: "gradient",
          type: "linearGradient",
          colors: [
            {
              offset: 0,
              color: "#000",
            },
            {
              offset: 100,
              color: "inherit",
            },
          ],
        },
      ]}
      fill={[
        {
          match: {
            id: "CAN",
          },
          id: "dots",
        },
        {
          match: {
            id: "CHN",
          },
          id: "lines",
        },
        {
          match: {
            id: "ATA",
          },
          id: "gradient",
        },
      ]}
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#444444",
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default function Geomap() {
  const data = [
    {
      id: "AFG",
      value: 417609,
    },
    {
      id: "AGO",
      value: 397282,
    },
    {
      id: "ALB",
      value: 683217,
    },
    {
      id: "ARE",
      value: 115738,
    },
    {
      id: "ARG",
      value: 513626,
    },
    {
      id: "ARM",
      value: 819553,
    },
    {
      id: "ATA",
      value: 131115,
    },
    {
      id: "ATF",
      value: 49515,
    },
    {
      id: "AUT",
      value: 770593,
    },
    {
      id: "AZE",
      value: 762990,
    },
    {
      id: "BDI",
      value: 552085,
    },
    {
      id: "BEL",
      value: 960468,
    },
    {
      id: "BEN",
      value: 613570,
    },
    {
      id: "BFA",
      value: 274200,
    },
    {
      id: "BGD",
      value: 636446,
    },
    {
      id: "BGR",
      value: 509366,
    },
    {
      id: "BHS",
      value: 843762,
    },
    {
      id: "BIH",
      value: 254279,
    },
    {
      id: "BLR",
      value: 831888,
    },
    {
      id: "BLZ",
      value: 720827,
    },
    {
      id: "BOL",
      value: 941438,
    },
    {
      id: "BRN",
      value: 391043,
    },
    {
      id: "BTN",
      value: 372697,
    },
    {
      id: "BWA",
      value: 747249,
    },
    {
      id: "CAF",
      value: 222204,
    },
    {
      id: "CAN",
      value: 911041,
    },
    {
      id: "CHE",
      value: 897424,
    },
    {
      id: "CHL",
      value: 433599,
    },
    {
      id: "CHN",
      value: 7059,
    },
    {
      id: "CIV",
      value: 397513,
    },
    {
      id: "CMR",
      value: 505581,
    },
    {
      id: "COG",
      value: 251599,
    },
    {
      id: "COL",
      value: 557638,
    },
    {
      id: "CRI",
      value: 838572,
    },
    {
      id: "CUB",
      value: 45867,
    },
    {
      id: "-99",
      value: 118832,
    },
    {
      id: "CYP",
      value: 969834,
    },
    {
      id: "CZE",
      value: 519524,
    },
    {
      id: "DEU",
      value: 277751,
    },
    {
      id: "DJI",
      value: 786185,
    },
    {
      id: "DNK",
      value: 564064,
    },
    {
      id: "DOM",
      value: 209908,
    },
    {
      id: "DZA",
      value: 56570,
    },
    {
      id: "ECU",
      value: 49590,
    },
    {
      id: "EGY",
      value: 300731,
    },
    {
      id: "ERI",
      value: 483666,
    },
    {
      id: "ESP",
      value: 513999,
    },
    {
      id: "EST",
      value: 183067,
    },
    {
      id: "ETH",
      value: 947540,
    },
    {
      id: "FIN",
      value: 809183,
    },
    {
      id: "FJI",
      value: 41253,
    },
    {
      id: "FLK",
      value: 358467,
    },
    {
      id: "FRA",
      value: 130887,
    },
    {
      id: "GAB",
      value: 22605,
    },
    {
      id: "GBR",
      value: 707153,
    },
    {
      id: "GEO",
      value: 925488,
    },
    {
      id: "GHA",
      value: 811613,
    },
    {
      id: "GIN",
      value: 637940,
    },
    {
      id: "GMB",
      value: 885207,
    },
    {
      id: "GNB",
      value: 19043,
    },
    {
      id: "GNQ",
      value: 941877,
    },
    {
      id: "GRC",
      value: 56901,
    },
    {
      id: "GTM",
      value: 961748,
    },
    {
      id: "GUY",
      value: 31179,
    },
    {
      id: "HND",
      value: 223003,
    },
    {
      id: "HRV",
      value: 955639,
    },
    {
      id: "HTI",
      value: 366536,
    },
    {
      id: "HUN",
      value: 823351,
    },
    {
      id: "IDN",
      value: 192608,
    },
    {
      id: "IND",
      value: 758322,
    },
    {
      id: "IRL",
      value: 917705,
    },
    {
      id: "IRN",
      value: 793757,
    },
    {
      id: "IRQ",
      value: 663271,
    },
    {
      id: "ISL",
      value: 287281,
    },
    {
      id: "ISR",
      value: 151836,
    },
    {
      id: "ITA",
      value: 88063,
    },
    {
      id: "JAM",
      value: 542147,
    },
    {
      id: "JOR",
      value: 678107,
    },
    {
      id: "JPN",
      value: 955015,
    },
    {
      id: "KAZ",
      value: 532591,
    },
    {
      id: "KEN",
      value: 39200,
    },
    {
      id: "KGZ",
      value: 529670,
    },
    {
      id: "KHM",
      value: 207659,
    },
    {
      id: "OSA",
      value: 884599,
    },
    {
      id: "KWT",
      value: 881676,
    },
    {
      id: "LAO",
      value: 249141,
    },
    {
      id: "LBN",
      value: 32352,
    },
    {
      id: "LBR",
      value: 656388,
    },
    {
      id: "LBY",
      value: 370341,
    },
    {
      id: "LKA",
      value: 818878,
    },
    {
      id: "LSO",
      value: 453207,
    },
    {
      id: "LTU",
      value: 458225,
    },
    {
      id: "LUX",
      value: 133163,
    },
    {
      id: "LVA",
      value: 686303,
    },
    {
      id: "MAR",
      value: 678149,
    },
    {
      id: "MDA",
      value: 912642,
    },
    {
      id: "MDG",
      value: 702494,
    },
    {
      id: "MEX",
      value: 838412,
    },
    {
      id: "MKD",
      value: 891462,
    },
    {
      id: "MLI",
      value: 454490,
    },
    {
      id: "MMR",
      value: 290684,
    },
    {
      id: "MNE",
      value: 265522,
    },
    {
      id: "MNG",
      value: 870285,
    },
    {
      id: "MOZ",
      value: 760280,
    },
    {
      id: "MRT",
      value: 32655,
    },
    {
      id: "MWI",
      value: 63038,
    },
    {
      id: "MYS",
      value: 555559,
    },
    {
      id: "NAM",
      value: 386325,
    },
    {
      id: "NCL",
      value: 797935,
    },
    {
      id: "NER",
      value: 180159,
    },
    {
      id: "NGA",
      value: 463927,
    },
    {
      id: "NIC",
      value: 618555,
    },
    {
      id: "NLD",
      value: 810950,
    },
    {
      id: "NOR",
      value: 814204,
    },
    {
      id: "NPL",
      value: 714691,
    },
    {
      id: "NZL",
      value: 318157,
    },
    {
      id: "OMN",
      value: 137974,
    },
    {
      id: "PAK",
      value: 65219,
    },
    {
      id: "PAN",
      value: 352069,
    },
    {
      id: "PER",
      value: 764577,
    },
    {
      id: "PHL",
      value: 474869,
    },
    {
      id: "PNG",
      value: 242211,
    },
    {
      id: "POL",
      value: 200796,
    },
    {
      id: "PRI",
      value: 684650,
    },
    {
      id: "PRT",
      value: 441580,
    },
    {
      id: "PRY",
      value: 433593,
    },
    {
      id: "QAT",
      value: 42675,
    },
    {
      id: "ROU",
      value: 370275,
    },
    {
      id: "RUS",
      value: 415908,
    },
    {
      id: "RWA",
      value: 358565,
    },
    {
      id: "ESH",
      value: 952079,
    },
    {
      id: "SAU",
      value: 546121,
    },
    {
      id: "SDN",
      value: 644627,
    },
    {
      id: "SDS",
      value: 905746,
    },
    {
      id: "SEN",
      value: 409003,
    },
    {
      id: "SLB",
      value: 442150,
    },
    {
      id: "SLE",
      value: 79095,
    },
    {
      id: "SLV",
      value: 473364,
    },
    {
      id: "ABV",
      value: 860432,
    },
    {
      id: "SOM",
      value: 791463,
    },
    {
      id: "SRB",
      value: 216278,
    },
    {
      id: "SUR",
      value: 56109,
    },
    {
      id: "SVK",
      value: 998016,
    },
    {
      id: "SVN",
      value: 628667,
    },
    {
      id: "SWZ",
      value: 775017,
    },
    {
      id: "SYR",
      value: 15294,
    },
    {
      id: "TCD",
      value: 31580,
    },
    {
      id: "TGO",
      value: 384160,
    },
    {
      id: "THA",
      value: 509825,
    },
    {
      id: "TJK",
      value: 548485,
    },
    {
      id: "TKM",
      value: 257543,
    },
    {
      id: "TLS",
      value: 202811,
    },
    {
      id: "TTO",
      value: 597996,
    },
    {
      id: "TUN",
      value: 508439,
    },
    {
      id: "TUR",
      value: 42691,
    },
    {
      id: "TWN",
      value: 633730,
    },
    {
      id: "TZA",
      value: 149864,
    },
    {
      id: "UGA",
      value: 54839,
    },
    {
      id: "UKR",
      value: 498737,
    },
    {
      id: "URY",
      value: 987026,
    },
    {
      id: "USA",
      value: 90853,
    },
    {
      id: "UZB",
      value: 257455,
    },
    {
      id: "VEN",
      value: 63575,
    },
    {
      id: "VNM",
      value: 659348,
    },
    {
      id: "VUT",
      value: 749169,
    },
    {
      id: "PSE",
      value: 221280,
    },
    {
      id: "YEM",
      value: 494570,
    },
    {
      id: "ZAF",
      value: 21276,
    },
    {
      id: "ZMB",
      value: 306826,
    },
    {
      id: "ZWE",
      value: 853019,
    },
    {
      id: "KOR",
      value: 469629,
    },
  ];

  return (
    <div className="w-full h-[400px] bg-red-300">
      <MyResponsiveChoropleth data={data} />
    </div>
  );
}
