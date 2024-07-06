import { getRangeOption, RANGE_OPTIONS } from "@/lib/rangeOptions";
import { ChartCard } from "@/components/charts/ChartCard";
import { getTotalVaccinations } from "./getTotalVaccinations";
import { getDailyVaccinationDoses } from "./getDailyVaccinationDoses";
import { getCumulVaccinationDoses } from "./getCumulVaccinationDoses";
import { getDailyVaccinationsAdol } from "./getDailyVaccinationsAdol";
import { getCumulVaccinationsAdol } from "./getCumulVaccinationsAdol";
import { getDailyVaccinationsChild } from "./getDailyVaccinationsChild";
import { getCumulVaccinationsChild } from "./getCumulVaccinationsChild";
import { getVaccineBrandDistribution } from "./getVaccineBrandDistribution";
import { getDailyVaccinationsByBrand } from "./getDailyVaccinationsByBrand";
import { getFirstDoseByBrand } from "./getFirstDoseByBrand";
import { getSecondDoseByBrand } from "./getSecondDoseByBrand";
import { getThirdDoseByBrand } from "./getThirdDoseByBrand";
import { getFourthDoseByBrand } from "./getFourthDoseByBrand";
import TotalVaccinationsChart from "@/components/charts/national-vaccinations/TotalVaccinationsChart";
import DailyVaccinationDoseChart from "@/components/charts/national-vaccinations/DailyVaccinationDoseChart";
import CumulVaccinationDoseChart from "@/components/charts/national-vaccinations/CumulVaccinationDoseChart";
import DailyVaccinationsAdolChart from "@/components/charts/national-vaccinations/DailyVaccinationsAdolChart";
import CumulVaccinationsAdolChart from "@/components/charts/national-vaccinations/CumulVaccinationsAdolChart";
import DailyVaccinationsChildChart from "@/components/charts/national-vaccinations/DailyVaccinationsChildChart";
import CumulVaccinationsChildChart from "@/components/charts/national-vaccinations/CumulVaccinationsChildChart";
import VaccineBrandDistributionChart from "@/components/charts/national-vaccinations/VaccineBrandDistributionChart";
import DailyVaccinationsByBrandChart from "@/components/charts/national-vaccinations/DailyVaccinationsByBrandChart";
import FirstDoseByBrandChart from "@/components/charts/national-vaccinations/FirstDoseByBrandChart";
import SecondDoseByBrandChart from "@/components/charts/national-vaccinations/SecondDoseByBrandChart";
import ThirdDoseByBrandChart from "@/components/charts/national-vaccinations/ThirdDoseByBrandChart";
import FourthDoseByBrandChart from "@/components/charts/national-vaccinations/FourthDoseByBrandChart";

export default async function NationalVaccinations({
  searchParams: {
    // Overview
    totalVaccinationsRange,
    totalVaccinationsRangeFrom,
    totalVaccinationsRangeTo,
    dailyVaccinationsDoseRange,
    dailyVaccinationsDoseRangeFrom,
    dailyVaccinationsDoseRangeTo,
    cumulVaccinationsDoseRange,
    cumulVaccinationsDoseRangeFrom,
    cumulVaccinationsDoseRangeTo,
    // Vaccinations by Age Group
    dailyVaccinationsAdolRange,
    dailyVaccinationsAdolRangeFrom,
    dailyVaccinationsAdolRangeTo,
    cumulVaccinationsAdolRange,
    cumulVaccinationsAdolRangeFrom,
    cumulVaccinationsAdolRangeTo,
    dailyVaccinationsChildRange,
    dailyVaccinationsChildRangeFrom,
    dailyVaccinationsChildRangeTo,
    cumulVaccinationsChildRange,
    cumulVaccinationsChildRangeFrom,
    cumulVaccinationsChildRangeTo,
    // Vaccinations by Brand
    vaccineBrandDistributionRange,
    vaccineBrandDistributionRangeFrom,
    vaccineBrandDistributionRangeTo,
    dailyVaccinationsByBrandRange,
    dailyVaccinationsByBrandRangeFrom,
    dailyVaccinationsByBrandRangeTo,
    firstDoseByBrandRange,
    firstDoseByBrandRangeFrom,
    firstDoseByBrandRangeTo,
    secondDoseByBrandRange,
    secondDoseByBrandRangeFrom,
    secondDoseByBrandRangeTo,
    thirdDoseByBrandRange,
    thirdDoseByBrandRangeFrom,
    thirdDoseByBrandRangeTo,
    fourthDoseByBrandRange,
    fourthDoseByBrandRangeFrom,
    fourthDoseByBrandRangeTo
  }
}: {
  searchParams: {
    // Overview
    totalVaccinationsRange?: string,
    totalVaccinationsRangeFrom?: string,
    totalVaccinationsRangeTo?: string,
    dailyVaccinationsDoseRange?: string,
    dailyVaccinationsDoseRangeFrom?: string,
    dailyVaccinationsDoseRangeTo?: string,
    cumulVaccinationsDoseRange?: string,
    cumulVaccinationsDoseRangeFrom?: string,
    cumulVaccinationsDoseRangeTo?: string,
    // Vaccinations by Age Group
    dailyVaccinationsAdultRange?: string,
    dailyVaccinationsAdultRangeFrom?: string,
    dailyVaccinationsAdultRangeTo?: string,
    dailyVaccinationsAdolRange?: string,
    dailyVaccinationsAdolRangeFrom?: string,
    dailyVaccinationsAdolRangeTo?: string,
    cumulVaccinationsAdolRange?: string,
    cumulVaccinationsAdolRangeFrom?: string,
    cumulVaccinationsAdolRangeTo?: string,
    dailyVaccinationsChildRange?: string,
    dailyVaccinationsChildRangeFrom?: string,
    dailyVaccinationsChildRangeTo?: string,
    cumulVaccinationsChildRange?: string,
    cumulVaccinationsChildRangeFrom?: string,
    cumulVaccinationsChildRangeTo?: string,
    // Vaccinations by Brand
    vaccineBrandDistributionRange?: string,
    vaccineBrandDistributionRangeFrom?: string,
    vaccineBrandDistributionRangeTo?: string,
    dailyVaccinationsByBrandRange?: string,
    dailyVaccinationsByBrandRangeFrom?: string,
    dailyVaccinationsByBrandRangeTo?: string,
    firstDoseByBrandRange?: string,
    firstDoseByBrandRangeFrom?: string,
    firstDoseByBrandRangeTo?: string,
    secondDoseByBrandRange?: string,
    secondDoseByBrandRangeFrom?: string,
    secondDoseByBrandRangeTo?: string,
    thirdDoseByBrandRange?: string,
    thirdDoseByBrandRangeFrom?: string,
    thirdDoseByBrandRangeTo?: string,
    fourthDoseByBrandRange?: string,
    fourthDoseByBrandRangeFrom?: string,
    fourthDoseByBrandRangeTo?: string
  }
}) {
  // Overview
  const totalVaccinationsRangeOption =
    getRangeOption(
      totalVaccinationsRange,
      totalVaccinationsRangeFrom,
      totalVaccinationsRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const dailyVaccinationsDoseRangeOption =
    getRangeOption(
      dailyVaccinationsDoseRange,
      dailyVaccinationsDoseRangeFrom,
      dailyVaccinationsDoseRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const cumulVaccinationsDoseRangeOption =
    getRangeOption(
      cumulVaccinationsDoseRange,
      cumulVaccinationsDoseRangeFrom,
      cumulVaccinationsDoseRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  // Vaccinations by Age Group
  const dailyVaccinationsAdolRangeOption =
    getRangeOption(
      dailyVaccinationsAdolRange,
      dailyVaccinationsAdolRangeFrom,
      dailyVaccinationsAdolRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const cumulVaccinationsAdolRangeOption =
    getRangeOption(
      cumulVaccinationsAdolRange,
      cumulVaccinationsAdolRangeFrom,
      cumulVaccinationsAdolRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const dailyVaccinationsChildRangeOption =
    getRangeOption(
      dailyVaccinationsChildRange,
      dailyVaccinationsChildRangeFrom,
      dailyVaccinationsChildRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const cumulVaccinationsChildRangeOption =
    getRangeOption(
      cumulVaccinationsChildRange,
      cumulVaccinationsChildRangeFrom,
      cumulVaccinationsChildRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  // Vaccinations by Brand
  const vaccineBrandDistributionRangeOption =
    getRangeOption(
      vaccineBrandDistributionRange,
      vaccineBrandDistributionRangeFrom,
      vaccineBrandDistributionRangeTo
    ) || RANGE_OPTIONS.all_time;
  
  const dailyVaccinationsByBrandRangeOption =
    getRangeOption(
      dailyVaccinationsByBrandRange,
      dailyVaccinationsByBrandRangeFrom,
      dailyVaccinationsByBrandRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const firstDoseByBrandRangeOption =
    getRangeOption(
      firstDoseByBrandRange,
      firstDoseByBrandRangeFrom,
      firstDoseByBrandRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const secondDoseByBrandRangeOption =
    getRangeOption(
      secondDoseByBrandRange,
      secondDoseByBrandRangeFrom,
      secondDoseByBrandRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const thirdDoseByBrandRangeOption =
    getRangeOption(
      thirdDoseByBrandRange,
      thirdDoseByBrandRangeFrom,
      thirdDoseByBrandRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const fourthDoseByBrandRangeOption =
    getRangeOption(
      fourthDoseByBrandRange,
      fourthDoseByBrandRangeFrom,
      fourthDoseByBrandRangeTo
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const [
    totalVaccinationsData, dailyVaccinationDoseData, cumulVaccinationDoseData,
    dailyVaccinationsAdolData, cumulVaccinationsAdolData, dailyVaccinationsChildData, cumulVaccinationsChildData,
    vaccineBrandDistributionData, dailyVaccinationsByBrandData, firstDoseByBrandData, secondDoseByBrandData, thirdDoseByBrandData, fourthDoseByBrandData
  ] = await Promise.all([
    // Overview
    getTotalVaccinations(
      totalVaccinationsRangeOption.startDate,
      totalVaccinationsRangeOption.endDate,
    ),
    getDailyVaccinationDoses(
      dailyVaccinationsDoseRangeOption.startDate,
      dailyVaccinationsDoseRangeOption.endDate,
    ),
    getCumulVaccinationDoses(
      cumulVaccinationsDoseRangeOption.startDate,
      cumulVaccinationsDoseRangeOption.endDate,
    ),
    // Vaccinations by Age Group
    getDailyVaccinationsAdol(
      dailyVaccinationsAdolRangeOption.startDate,
      dailyVaccinationsAdolRangeOption.endDate,
    ),
    getCumulVaccinationsAdol(
      cumulVaccinationsAdolRangeOption.startDate,
      cumulVaccinationsAdolRangeOption.endDate,
    ),
    getDailyVaccinationsChild(
      dailyVaccinationsChildRangeOption.startDate,
      dailyVaccinationsChildRangeOption.endDate,
    ),
    getCumulVaccinationsChild(
      cumulVaccinationsChildRangeOption.startDate,
      cumulVaccinationsChildRangeOption.endDate,
    ),
    // Vaccinations by Brand
    getVaccineBrandDistribution(
      vaccineBrandDistributionRangeOption.startDate,
      vaccineBrandDistributionRangeOption.endDate
    ),
    getDailyVaccinationsByBrand(
      dailyVaccinationsByBrandRangeOption.startDate,
      dailyVaccinationsByBrandRangeOption.endDate
    ),
    getFirstDoseByBrand(
      firstDoseByBrandRangeOption.startDate,
      firstDoseByBrandRangeOption.endDate
    ),
    getSecondDoseByBrand(
      secondDoseByBrandRangeOption.startDate,
      secondDoseByBrandRangeOption.endDate
    ),
    getThirdDoseByBrand(
      thirdDoseByBrandRangeOption.startDate,
      thirdDoseByBrandRangeOption.endDate
    ),
    getFourthDoseByBrand(
      fourthDoseByBrandRangeOption.startDate,
      fourthDoseByBrandRangeOption.endDate
    )
  ]);

  return (
    <div className="max-h-full">
      <h2 className="m-6 text-4xl font-bold">National Vaccinations Dataset</h2>
      <p className="m-6 text-lg text-gray-700">
        This dataset contains the national vaccination data of Malaysia.
      </p>

      <div className="flex h-full m-6 flex-col gap-8">
        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">Overview</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="col-span-2">
              <ChartCard
                title="Total Vaccinations"
                description="Daily and cumulative vaccinations"
                queryKey="totalVaccinationsRange"
                selectedRangeLabel={totalVaccinationsRangeOption.label}>
                  <TotalVaccinationsChart data={totalVaccinationsData.chartData}></TotalVaccinationsChart>
              </ChartCard>
            </div>
            <ChartCard
              title="Daily Vaccinations by Dose Type"
              description="Daily amounts of partial, full, or booster vaccination doses administered"
              queryKey="dailyVaccinationsDoseRange"
              selectedRangeLabel={dailyVaccinationsDoseRangeOption.label}>
                <DailyVaccinationDoseChart data={dailyVaccinationDoseData.chartData}></DailyVaccinationDoseChart>
            </ChartCard>
            <ChartCard
              title="Cumulative Vaccinations by Dose Type"
              description="Cumulative amounts of partial, full, or booster vaccination doses administered"
              queryKey="cumulVaccinationsDoseRange"
              selectedRangeLabel={cumulVaccinationsDoseRangeOption.label}>
                <CumulVaccinationDoseChart data={cumulVaccinationDoseData.chartData}></CumulVaccinationDoseChart>
            </ChartCard>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">Vaccinations by Age Group</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <ChartCard
              title="Adolescents (Daily)"
              description="Daily vaccinations administered to adolescents"
              queryKey="dailyVaccinationsAdolRange"
              selectedRangeLabel={dailyVaccinationsAdolRangeOption.label}>
                <DailyVaccinationsAdolChart data={dailyVaccinationsAdolData.chartData}></DailyVaccinationsAdolChart>
            </ChartCard>
            <ChartCard
              title="Adolescents (Cumulative)"
              description="Cumulative vaccinations administered to adolescents"
              queryKey="cumulVaccinationsAdolRange"
              selectedRangeLabel={cumulVaccinationsAdolRangeOption.label}>
                <CumulVaccinationsAdolChart data={cumulVaccinationsAdolData.chartData}></CumulVaccinationsAdolChart>
            </ChartCard>
            <ChartCard
              title="Children (Daily)"
              description="Daily vaccinations administered to children"
              queryKey="dailyVaccinationsChildRange"
              selectedRangeLabel={dailyVaccinationsChildRangeOption.label}>
                <DailyVaccinationsChildChart data={dailyVaccinationsChildData.chartData}></DailyVaccinationsChildChart>
            </ChartCard>
            <ChartCard
              title="Children (Cumulative)"
              description="Cumulative vaccinations administered to children"
              queryKey="cumulVaccinationsChildRange"
              selectedRangeLabel={cumulVaccinationsChildRangeOption.label}>
                <CumulVaccinationsChildChart data={cumulVaccinationsChildData.chartData}></CumulVaccinationsChildChart>
            </ChartCard>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">Vaccinations by Brand</h3>
          <div className="pb-4 grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <ChartCard
              title="Vaccine Brand Distribution"
              description="Distribution of vaccination doses by brand"
              queryKey="vaccineBrandDistributionRange"
              selectedRangeLabel={vaccineBrandDistributionRangeOption.label}>
                <VaccineBrandDistributionChart data={vaccineBrandDistributionData.chartData}></VaccineBrandDistributionChart>
            </ChartCard>
            <ChartCard
              title="Daily Vaccinations"
              description="Daily total vaccination doses administered"
              queryKey="dailyVaccinationsByBrandRange"
              selectedRangeLabel={dailyVaccinationsByBrandRangeOption.label}>
                <DailyVaccinationsByBrandChart data={dailyVaccinationsByBrandData.chartData}></DailyVaccinationsByBrandChart>
            </ChartCard>
            <ChartCard
              title="First Dose"
              description="First vaccination doses"
              queryKey="firstDoseByBrandRange"
              selectedRangeLabel={firstDoseByBrandRangeOption.label}>
                <FirstDoseByBrandChart data={firstDoseByBrandData.chartData}></FirstDoseByBrandChart>
            </ChartCard>
            <ChartCard
              title="Second Dose"
              description="Second vaccination doses"
              queryKey="secondDoseByBrandRange"
              selectedRangeLabel={secondDoseByBrandRangeOption.label}>
                <SecondDoseByBrandChart data={secondDoseByBrandData.chartData}></SecondDoseByBrandChart>
            </ChartCard>
            <ChartCard
              title="Third Dose"
              description="Third vaccination doses"
              queryKey="thirdDoseByBrandRange"
              selectedRangeLabel={thirdDoseByBrandRangeOption.label}>
                <ThirdDoseByBrandChart data={thirdDoseByBrandData.chartData}></ThirdDoseByBrandChart>
            </ChartCard>
            <ChartCard
              title="Fourth Dose"
              description="Fourth vaccination doses"
              queryKey="fourthDoseByBrandRange"
              selectedRangeLabel={fourthDoseByBrandRangeOption.label}>
                <FourthDoseByBrandChart data={fourthDoseByBrandData.chartData}></FourthDoseByBrandChart>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}
