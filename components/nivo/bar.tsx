"use client";
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = (data: any) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
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
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default function BarChart() {
  const data = [
    {
      country: "AD",
      "hot dog": 12,
      "hot dogColor": "hsl(169, 70%, 50%)",
      burger: 150,
      burgerColor: "hsl(150, 70%, 50%)",
      sandwich: 93,
      sandwichColor: "hsl(287, 70%, 50%)",
      kebab: 180,
      kebabColor: "hsl(154, 70%, 50%)",
      fries: 129,
      friesColor: "hsl(348, 70%, 50%)",
      donut: 116,
      donutColor: "hsl(298, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 128,
      "hot dogColor": "hsl(130, 70%, 50%)",
      burger: 88,
      burgerColor: "hsl(166, 70%, 50%)",
      sandwich: 66,
      sandwichColor: "hsl(51, 70%, 50%)",
      kebab: 100,
      kebabColor: "hsl(66, 70%, 50%)",
      fries: 191,
      friesColor: "hsl(11, 70%, 50%)",
      donut: 81,
      donutColor: "hsl(289, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 102,
      "hot dogColor": "hsl(271, 70%, 50%)",
      burger: 87,
      burgerColor: "hsl(141, 70%, 50%)",
      sandwich: 130,
      sandwichColor: "hsl(111, 70%, 50%)",
      kebab: 185,
      kebabColor: "hsl(265, 70%, 50%)",
      fries: 66,
      friesColor: "hsl(343, 70%, 50%)",
      donut: 147,
      donutColor: "hsl(339, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 170,
      "hot dogColor": "hsl(244, 70%, 50%)",
      burger: 148,
      burgerColor: "hsl(292, 70%, 50%)",
      sandwich: 184,
      sandwichColor: "hsl(127, 70%, 50%)",
      kebab: 103,
      kebabColor: "hsl(73, 70%, 50%)",
      fries: 42,
      friesColor: "hsl(359, 70%, 50%)",
      donut: 113,
      donutColor: "hsl(313, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 132,
      "hot dogColor": "hsl(23, 70%, 50%)",
      burger: 190,
      burgerColor: "hsl(104, 70%, 50%)",
      sandwich: 192,
      sandwichColor: "hsl(83, 70%, 50%)",
      kebab: 140,
      kebabColor: "hsl(281, 70%, 50%)",
      fries: 18,
      friesColor: "hsl(94, 70%, 50%)",
      donut: 59,
      donutColor: "hsl(221, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 192,
      "hot dogColor": "hsl(279, 70%, 50%)",
      burger: 65,
      burgerColor: "hsl(117, 70%, 50%)",
      sandwich: 83,
      sandwichColor: "hsl(263, 70%, 50%)",
      kebab: 155,
      kebabColor: "hsl(28, 70%, 50%)",
      fries: 100,
      friesColor: "hsl(77, 70%, 50%)",
      donut: 70,
      donutColor: "hsl(259, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 134,
      "hot dogColor": "hsl(347, 70%, 50%)",
      burger: 170,
      burgerColor: "hsl(213, 70%, 50%)",
      sandwich: 193,
      sandwichColor: "hsl(357, 70%, 50%)",
      kebab: 190,
      kebabColor: "hsl(281, 70%, 50%)",
      fries: 8,
      friesColor: "hsl(341, 70%, 50%)",
      donut: 45,
      donutColor: "hsl(282, 70%, 50%)",
    },
  ];

  return (
    <div className="w-full h-full p-16 bg-red-500">
      <MyResponsiveBar data={data} />
    </div>
  );
}
