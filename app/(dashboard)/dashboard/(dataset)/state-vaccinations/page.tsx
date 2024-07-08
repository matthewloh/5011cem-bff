import { getRangeOption, RANGE_OPTIONS } from "@/lib/rangeOptions";
import { getStateOption, STATE_OPTIONS } from "@/lib/stateOptions";
import { StateDropdown } from "@/components/StateDropdown";
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
import TotalVaccinationsChart from "@/components/charts/vaccinations/TotalVaccinationsChart";
import DailyVaccinationDoseChart from "@/components/charts/vaccinations/DailyVaccinationDoseChart";
import CumulVaccinationDoseChart from "@/components/charts/vaccinations/CumulVaccinationDoseChart";
import DailyVaccinationsAdolChart from "@/components/charts/vaccinations/DailyVaccinationsAdolChart";
import CumulVaccinationsAdolChart from "@/components/charts/vaccinations/CumulVaccinationsAdolChart";
import DailyVaccinationsChildChart from "@/components/charts/vaccinations/DailyVaccinationsChildChart";
import CumulVaccinationsChildChart from "@/components/charts/vaccinations/CumulVaccinationsChildChart";
import VaccineDistributionChart from "@/components/charts/vaccinations/VaccineBrandDistributionChart";
import DailyVaccinationsByBrandChart from "@/components/charts/vaccinations/DailyVaccinationsByBrandChart";
import FirstDoseByBrandChart from "@/components/charts/vaccinations/FirstDoseByBrandChart";
import SecondDoseByBrandChart from "@/components/charts/vaccinations/SecondDoseByBrandChart";
import ThirdDoseByBrandChart from "@/components/charts/vaccinations/ThirdDoseByBrandChart";
import FourthDoseByBrandChart from "@/components/charts/vaccinations/FourthDoseByBrandChart";

export default async function StateVaccinations({
  searchParams: {
    // State
    selectedState,
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
    // State
    selectedState?: string,
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
  // State Selection
  const selectedStateOption = getStateOption(selectedState) || STATE_OPTIONS.pulau_pinang;

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
      selectedStateOption.value,
    ),
    getDailyVaccinationDoses(
      dailyVaccinationsDoseRangeOption.startDate,
      dailyVaccinationsDoseRangeOption.endDate,
      selectedStateOption.value,
    ),
    getCumulVaccinationDoses(
      cumulVaccinationsDoseRangeOption.startDate,
      cumulVaccinationsDoseRangeOption.endDate,
      selectedStateOption.value,
    ),
    // Vaccinations by Age Group
    getDailyVaccinationsAdol(
      dailyVaccinationsAdolRangeOption.startDate,
      dailyVaccinationsAdolRangeOption.endDate,
      selectedStateOption.value,
    ),
    getCumulVaccinationsAdol(
      cumulVaccinationsAdolRangeOption.startDate,
      cumulVaccinationsAdolRangeOption.endDate,
      selectedStateOption.value,
    ),
    getDailyVaccinationsChild(
      dailyVaccinationsChildRangeOption.startDate,
      dailyVaccinationsChildRangeOption.endDate,
      selectedStateOption.value,
    ),
    getCumulVaccinationsChild(
      cumulVaccinationsChildRangeOption.startDate,
      cumulVaccinationsChildRangeOption.endDate,
      selectedStateOption.value,
    ),
    // Vaccinations by Brand
    getVaccineBrandDistribution(
      vaccineBrandDistributionRangeOption.startDate,
      vaccineBrandDistributionRangeOption.endDate,
      selectedStateOption.value,
    ),
    getDailyVaccinationsByBrand(
      dailyVaccinationsByBrandRangeOption.startDate,
      dailyVaccinationsByBrandRangeOption.endDate,
      selectedStateOption.value,
    ),
    getFirstDoseByBrand(
      firstDoseByBrandRangeOption.startDate,
      firstDoseByBrandRangeOption.endDate,
      selectedStateOption.value,
    ),
    getSecondDoseByBrand(
      secondDoseByBrandRangeOption.startDate,
      secondDoseByBrandRangeOption.endDate,
      selectedStateOption.value,
    ),
    getThirdDoseByBrand(
      thirdDoseByBrandRangeOption.startDate,
      thirdDoseByBrandRangeOption.endDate,
      selectedStateOption.value,
    ),
    getFourthDoseByBrand(
      fourthDoseByBrandRangeOption.startDate,
      fourthDoseByBrandRangeOption.endDate,
      selectedStateOption.value,
    )
  ]);

  return (
    <div className="max-h-full">
      <div className="m-6 flex gap-4 justify-between">
        <h2 className="text-4xl font-bold">State Vaccinations Dataset</h2>
        <div className="self-auto rounded-md shadow-sm">
          <StateDropdown
            queryKey="selectedState"
            selectedStateLabel={selectedStateOption.label}
          />
        </div>
      </div>
      <p className="m-6 mt-0 text-lg text-gray-700">
        This dataset contains the vaccination data of every state in Malaysia.
      </p>

      <div className="flex h-full m-6 flex-col gap-8">
        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Overview</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="col-span-2">
              <ChartCard
                title="Total Vaccinations"
                description={"Cumulative vaccinations: " + totalVaccinationsData.chartData[totalVaccinationsData.chartData.length - 1].cumul}
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
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Vaccinations by Age Group</h3>
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
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Vaccinations by Brand</h3>
          <div className="pb-4 grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <ChartCard
              title="Vaccine Brand Distribution"
              description="Distribution of vaccination doses by brand"
              queryKey="vaccineBrandDistributionRange"
              selectedRangeLabel={vaccineBrandDistributionRangeOption.label}>
                <VaccineDistributionChart data={vaccineBrandDistributionData.chartData}></VaccineDistributionChart>
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
