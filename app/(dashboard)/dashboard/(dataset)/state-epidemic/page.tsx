import { getStateOption, STATE_OPTIONS } from "@/lib/stateOptions";
import { getRangeOption, RANGE_OPTIONS } from "@/lib/rangeOptions";
import { StateDropdown } from "@/components/StateDropdown";
import { ChartCard } from "@/components/charts/ChartCard";
import { getTestsByType } from "./getTestsByType";
import { TestsByTypeChart } from "@/components/charts/state_epidemic/TestsByTypeChart";
import { getTotalDeaths } from "./getTotalDeaths";
import { getDeathsByDateOfDeath } from "./getDeathsByDateOfDeath";
import { getDeathsByVaccinationStatus } from "./getDeathsByVaccinationStatus";
import { TotalDeathsChart } from "@/components/charts/state_epidemic/TotalDeathsChart";
import { DeathsByDateOfDeathChart } from "@/components/charts/state_epidemic/DeathsByDateOfDeathChart";
import { DeathsByVaccinationStatusChart } from "@/components/charts/state_epidemic/DeathsByVaccinationStatusChart";
import { getCasesByType } from "./getCasesByType";
import { getCasesByVaccinationStatus } from "./getCasesByVaccinationStatus";
import { getCasesByAgeGroup } from "./getCasesByAgeGroup";
import { CasesByTypeChart } from "@/components/charts/state_epidemic/CasesByTypeChart";
import { CasesByVaccinationStatusChart } from "@/components/charts/state_epidemic/CasesByVaccinationStatus";
import { CasesByAgeGroupChart } from "@/components/charts/state_epidemic/CasesByAgeGroupChart";
import { BedAllocationChart } from "@/components/charts/state_epidemic/BedAllocationChart";
import { getBedAllocation } from "./getBedAllocation";
import { getAdmissions } from "./getAdmissions";
import { AdmissionsChart } from "@/components/charts/state_epidemic/AdmissionsChart";
import { getDischarged } from "./getDischarged";
import { getHospitalizations } from "./getHospitalizations";
import { DischargedChart } from "@/components/charts/state_epidemic/DischargedChart";
import { HospitalizationsChart } from "@/components/charts/state_epidemic/HospitalizationsChart";
import { getICUBedAllocation } from "./getICUBedAllocation";
import { ICUBedAllocationChart } from "@/components/charts/state_epidemic/ICUBedAllocationChart";
import { getICUBedUtilization } from "./getICUBedUtilization";
import { ICUBedUtilizationChart } from "@/components/charts/state_epidemic/ICUBedUtilizationChart";
import { getVentilatorUtilization } from "./getVentilatorUtilization";
import { VentilatorUtilizationChart } from "@/components/charts/state_epidemic/VentilatorUtilizationChart";
import { getPortableVentilatorUtilization } from "./getPortableVentilatorUtilization";
import { PortableVentilatorUtilizationChart } from "@/components/charts/state_epidemic/PortableVentilatorUtilizationChart";
import { getVentilatorUsageByType } from "./getVentilizationUsageByType";
import { VentilatorUsageByTypeChart } from "@/components/charts/state_epidemic/VentilatorUsageByType";

export default async function StateEpidemic({
  searchParams: {
    // State
    selectedState,
    // Cases
    casesByTypeRange,
    casesByTypeRangeFrom,
    casesByTypeRangeTo,
    casesByVaccinationStatusRange,
    casesByVaccinationStatusRangeFrom,
    casesByVaccinationStatusRangeTo,
    casesByAgeGroupRange,
    casesByAgeGroupRangeFrom,
    casesByAgeGroupRangeTo,
    // Deaths
    totalDeathsRange,
    totalDeathsRangeFrom,
    totalDeathsRangeTo,
    deathsByDateOfDeathRange,
    deathsByDateOfDeathRangeFrom,
    deathsByDateOfDeathRangeTo,
    deathsByVaccinationStatusRange,
    deathsByVaccinationStatusRangeFrom,
    deathsByVaccinationStatusRangeTo,
    // Tests
    testsByTypeRange,
    testsByTypeRangeFrom,
    testsByTypeTo,
    // Hospital Resources
    bedAllocationRange,
    bedAllocationRangeFrom,
    bedAllocationRangeTo,
    admissionsRange,
    admissionsRangeFrom,
    admissionsRangeTo,
    dischargedRange,
    dischargedRangeFrom,
    dischargedRangeTo,
    hospitalizationsRange,
    hospitalizationsRangeFrom,
    hospitalizationsRangeTo,
    icuBedAllocationRange,
    icuBedAllocationRangeFrom,
    icuBedAllocationRangeTo,
    icuBedUtilizationRange,
    icuBedUtilizationRangeFrom,
    icuBedUtilizationRangeTo,
    ventilatorUtilizationRange,
    ventilatorUtilizationRangeFrom,
    ventilatorUtilizationRangeTo,
    portableVentilatorUtilizationRange,
    portableVentilatorUtilizationRangeFrom,
    portableVentilatorUtilizationRangeTo,
    ventilatorUsageByTypeRange,
    ventilatorUsageByTypeRangeFrom,
    ventilatorUsageByTypeRangeTo,
  }
}: {
  searchParams: {
    // State
    selectedState?: string,
    // Cases
    casesByTypeRange?: string,
    casesByTypeRangeFrom?: string,
    casesByTypeRangeTo?: string,
    casesByVaccinationStatusRange?: string,
    casesByVaccinationStatusRangeFrom?: string,
    casesByVaccinationStatusRangeTo?: string,
    casesByAgeGroupRange?: string,
    casesByAgeGroupRangeFrom?: string,
    casesByAgeGroupRangeTo?: string,
    // Deaths
    totalDeathsRange?: string,
    totalDeathsRangeFrom?: string,
    totalDeathsRangeTo?: string,
    deathsByDateOfDeathRange?: string,
    deathsByDateOfDeathRangeFrom?: string,
    deathsByDateOfDeathRangeTo?: string,
    deathsByVaccinationStatusRange?: string,
    deathsByVaccinationStatusRangeFrom?: string,
    deathsByVaccinationStatusRangeTo?: string,
    // Tests
    testsByTypeRange?: string,
    testsByTypeRangeFrom?: string,
    testsByTypeTo?: string,
    // Hospital Resources
    bedAllocationRange?: string,
    bedAllocationRangeFrom?: string,
    bedAllocationRangeTo?: string,
    admissionsRange?: string,
    admissionsRangeFrom?: string,
    admissionsRangeTo?: string,
    dischargedRange?: string,
    dischargedRangeFrom?: string,
    dischargedRangeTo?: string,
    hospitalizationsRange?: string,
    hospitalizationsRangeFrom?: string,
    hospitalizationsRangeTo?: string,
    icuBedAllocationRange?: string,
    icuBedAllocationRangeFrom?: string,
    icuBedAllocationRangeTo?: string,
    icuBedUtilizationRange?: string,
    icuBedUtilizationRangeFrom?: string,
    icuBedUtilizationRangeTo?: string,
    ventilatorUtilizationRange?: string,
    ventilatorUtilizationRangeFrom?: string,
    ventilatorUtilizationRangeTo?: string,
    portableVentilatorUtilizationRange?: string,
    portableVentilatorUtilizationRangeFrom?: string,
    portableVentilatorUtilizationRangeTo?: string,
    ventilatorUsageBreakdownRange?: string,
    ventilatorUsageBreakdownRangeFrom?: string,
    ventilatorUsageBreakdownRangeTo?: string,
    ventilatorUsageByTypeRange?: string,
    ventilatorUsageByTypeRangeFrom?: string,
    ventilatorUsageByTypeRangeTo?: string,
  }
}) {
  // State Selection
  const selectedStateOption = getStateOption(selectedState) || STATE_OPTIONS.pulau_pinang;

  // Cases
  const casesByTypeRangeOption =
    getRangeOption(
      casesByTypeRange,
      casesByTypeRangeFrom,
      casesByTypeRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const casesByVaccinationStatusRangeOption =
    getRangeOption(
      casesByVaccinationStatusRange,
      casesByVaccinationStatusRangeFrom,
      casesByVaccinationStatusRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const casesByAgeGroupRangeOption =
    getRangeOption(
      casesByAgeGroupRange,
      casesByAgeGroupRangeFrom,
      casesByAgeGroupRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  // Deaths
  const totalDeathsRangeOption =
    getRangeOption(
      totalDeathsRange,
      totalDeathsRangeFrom,
      totalDeathsRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const deathsByDateOfDeathRangeOption =
    getRangeOption(
      deathsByDateOfDeathRange,
      deathsByDateOfDeathRangeFrom,
      deathsByDateOfDeathRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const deathsByVaccinationStatusRangeOption =
    getRangeOption(
      deathsByVaccinationStatusRange,
      deathsByVaccinationStatusRangeFrom,
      deathsByVaccinationStatusRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  // Tests
  const testsByTypeRangeOption =
    getRangeOption(
      testsByTypeRange,
      testsByTypeRangeFrom,
      testsByTypeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  // Hospital Resources
  const bedAllocationRangeOption =
    getRangeOption(
      bedAllocationRange,
      bedAllocationRangeFrom,
      bedAllocationRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const admissionsRangeOption =
    getRangeOption(
      admissionsRange,
      admissionsRangeFrom,
      admissionsRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const dischargedRangeOption =
    getRangeOption(
      dischargedRange,
      dischargedRangeFrom,
      dischargedRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const hospitalizationsRangeOption =
    getRangeOption(
      hospitalizationsRange,
      hospitalizationsRangeFrom,
      hospitalizationsRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const icuBedAllocationRangeOption =
    getRangeOption(
      icuBedAllocationRange,
      icuBedAllocationRangeFrom,
      icuBedAllocationRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const icuBedUtilizationRangeOption =
    getRangeOption(
      icuBedUtilizationRange,
      icuBedUtilizationRangeFrom,
      icuBedUtilizationRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const ventilatorUtilizationRangeOption =
    getRangeOption(
      ventilatorUtilizationRange,
      ventilatorUtilizationRangeFrom,
      ventilatorUtilizationRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const portableVentilatorUtilizationRangeOption =
    getRangeOption(
      portableVentilatorUtilizationRange,
      portableVentilatorUtilizationRangeFrom,
      portableVentilatorUtilizationRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;
  
  const ventilatorUsageByTypeRangeOption =
    getRangeOption(
      ventilatorUsageByTypeRange,
      ventilatorUsageByTypeRangeFrom,
      ventilatorUsageByTypeRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const [
    casesByTypeData, casesByVaccinationStatusData, casesByAgeGroupData,
    totalDeathsData, deathsByDateOfDeathData, deathsByVaccinationStatusData,
    testsByTypeData,
    bedAllocationData, admissionsData, dischargedData, hospitalizationsData, icuBedAllocationData, icuBedUtilizationData, ventilatorUtilizationData, portableVentilatorUtilizationData, ventilatorUsageByTypeData
  ] = await Promise.all([
    // Cases
    getCasesByType(
      casesByTypeRangeOption.startDate,
      casesByTypeRangeOption.endDate,
      selectedStateOption.value
    ),
    getCasesByVaccinationStatus(
      casesByVaccinationStatusRangeOption.startDate,
      casesByVaccinationStatusRangeOption.endDate,
      selectedStateOption.value
    ),
    getCasesByAgeGroup(
      casesByAgeGroupRangeOption.startDate,
      casesByAgeGroupRangeOption.endDate,
      selectedStateOption.value
    ),
    // Deaths
    getTotalDeaths(
      totalDeathsRangeOption.startDate,
      totalDeathsRangeOption.endDate,
      selectedStateOption.value
    ),
    getDeathsByDateOfDeath(
      deathsByDateOfDeathRangeOption.startDate,
      deathsByDateOfDeathRangeOption.endDate,
      selectedStateOption.value
    ),
    getDeathsByVaccinationStatus(
      deathsByVaccinationStatusRangeOption.startDate,
      deathsByVaccinationStatusRangeOption.endDate,
      selectedStateOption.value
    ),
    // Tests
    getTestsByType(
      testsByTypeRangeOption.startDate,
      testsByTypeRangeOption.endDate,
      selectedStateOption.value
    ),
    // Hospital Resources
    getBedAllocation(
      bedAllocationRangeOption.startDate,
      bedAllocationRangeOption.endDate,
      selectedStateOption.value
    ),
    getAdmissions(
      admissionsRangeOption.startDate,
      admissionsRangeOption.endDate,
      selectedStateOption.value
    ),
    getDischarged(
      dischargedRangeOption.startDate,
      dischargedRangeOption.endDate,
      selectedStateOption.value
    ),
    getHospitalizations(
      hospitalizationsRangeOption.startDate,
      hospitalizationsRangeOption.endDate,
      selectedStateOption.value
    ),
    getICUBedAllocation(
      icuBedAllocationRangeOption.startDate,
      icuBedAllocationRangeOption.endDate,
      selectedStateOption.value
    ),
    getICUBedUtilization(
      icuBedUtilizationRangeOption.startDate,
      icuBedUtilizationRangeOption.endDate,
      selectedStateOption.value
    ),
    getVentilatorUtilization(
      ventilatorUtilizationRangeOption.startDate,
      ventilatorUtilizationRangeOption.endDate,
      selectedStateOption.value
    ),
    getPortableVentilatorUtilization(
      portableVentilatorUtilizationRangeOption.startDate,
      portableVentilatorUtilizationRangeOption.endDate,
      selectedStateOption.value
    ),
    getVentilatorUsageByType(
      ventilatorUsageByTypeRangeOption.startDate,
      ventilatorUsageByTypeRangeOption.endDate,
      selectedStateOption.value
    )
  ]);

  return (
    <div className="max-h-full">
      <div className="m-6 flex gap-4 justify-between">
        <h2 className="text-4xl font-bold">State Epidemic Dataset</h2>
        <div className="self-auto rounded-md shadow-sm">
          <StateDropdown
            queryKey="selectedState"
            selectedStateLabel={selectedStateOption.label}
          />
        </div>
      </div>
      <p className="m-6 text-lg text-gray-700">
        This dataset contains the epidemic data of every state in Malaysia.
      </p>

      <div className="flex h-full m-6 flex-col gap-8">
        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Cases</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="col-span-2">
              <ChartCard
                title="Cases by Type"
                description="Daily cases based on type"
                queryKey="casesByTypeRange"
                selectedRangeLabel={casesByTypeRangeOption.label}>
                <CasesByTypeChart data={casesByTypeData.chartData}></CasesByTypeChart>
              </ChartCard>
            </div>
            <ChartCard
                title="Cases by Vaccination Status"
                description="Daily cases based on vaccination status"
                queryKey="casesByVaccinationStatusRange"
                selectedRangeLabel={casesByVaccinationStatusRangeOption.label}>
                <CasesByVaccinationStatusChart data={casesByVaccinationStatusData.chartData}></CasesByVaccinationStatusChart>
              </ChartCard>
            <ChartCard
                title="Cases by Age Group"
                description="Daily cases based on age group"
                queryKey="casesByAgeGroupRange"
                selectedRangeLabel={casesByAgeGroupRangeOption.label}>
                <CasesByAgeGroupChart data={casesByAgeGroupData.chartData}></CasesByAgeGroupChart>
              </ChartCard>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Deaths</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="col-span-2">
              <ChartCard
                  title="Total Deaths"
                  description="Daily amounts of newly reported deaths"
                  queryKey="totalDeathsRange"
                  selectedRangeLabel={totalDeathsRangeOption.label}>
                  <TotalDeathsChart data={totalDeathsData.chartData}></TotalDeathsChart>
              </ChartCard>
            </div>
            <ChartCard
                title="Deaths by Date of Death"
                description="Daily amounts of deaths based on date of death"
                queryKey="deathsByDateOfDeathRange"
                selectedRangeLabel={deathsByDateOfDeathRangeOption.label}>
                <DeathsByDateOfDeathChart data={deathsByDateOfDeathData.chartData}></DeathsByDateOfDeathChart>
            </ChartCard>
            <ChartCard
                title="Deaths by Vaccination Status"
                description="Daily amounts of deaths based on vaccination status"
                queryKey="deathsByVaccinationStatusRange"
                selectedRangeLabel={deathsByVaccinationStatusRangeOption.label}>
                <DeathsByVaccinationStatusChart data={deathsByVaccinationStatusData.chartData}></DeathsByVaccinationStatusChart>
            </ChartCard>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Tests</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="col-span-2">
              <ChartCard
                title="Tests by Type"
                description="Daily amounts of tests conducted"
                queryKey="testsByTypeRange"
                selectedRangeLabel={testsByTypeRangeOption.label}>
                <TestsByTypeChart data={testsByTypeData.chartData}></TestsByTypeChart>
              </ChartCard>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="my-4 border-b pb-2 text-3xl font-semibold">{selectedStateOption.label}: Hospital Resources</h3>
          <div className="grid grid-rows-1 grid-cols-1 gap-2 lg:grid-cols-2">
            <ChartCard
              title="Bed Allocation"
              description="Overall allocation of hospital beds"
              queryKey="bedAllocationRange"
              selectedRangeLabel={bedAllocationRangeOption.label}>
              <BedAllocationChart data={bedAllocationData.chartData}></BedAllocationChart>
            </ChartCard>
            <ChartCard
              title="Admissions"
              description="Daily number of hospital admissions"
              queryKey="admissionsRange"
              selectedRangeLabel={admissionsRangeOption.label}>
              <AdmissionsChart data={admissionsData.chartData}></AdmissionsChart>
            </ChartCard>
            <ChartCard
              title="Discharged"
              description="Daily number of patients discharged from hospitals"
              queryKey="dischargedRange"
              selectedRangeLabel={dischargedRangeOption.label}>
              <DischargedChart data={dischargedData.chartData}></DischargedChart>
            </ChartCard>
            <ChartCard
              title="Hospitalizations"
              description="Daily number of hospitalizations"
              queryKey="hospitalizationsRange"
              selectedRangeLabel={hospitalizationsRangeOption.label}>
              <HospitalizationsChart data={hospitalizationsData.chartData}></HospitalizationsChart>
            </ChartCard>
            <div className="mt-10">
              <ChartCard
                title="ICU Bed Allocation"
                description="Overall allocation of ICU beds"
                queryKey="icuBedAllocationRange"
                selectedRangeLabel={icuBedAllocationRangeOption.label}>
                <ICUBedAllocationChart data={icuBedAllocationData.chartData}></ICUBedAllocationChart>
              </ChartCard>
            </div>
            <div className="mt-10">
              <ChartCard
                title="ICU Bed Utilization"
                description="Daily ICU bed capacity utilization"
                queryKey="icuBedUtilizationRange"
                selectedRangeLabel={icuBedUtilizationRangeOption.label}>
                <ICUBedUtilizationChart data={icuBedUtilizationData.chartData}></ICUBedUtilizationChart>
              </ChartCard>
            </div>
            <div className="mt-10">
              <ChartCard
                title="Ventilator Utilization"
                description="Daily ventilator capacity utilization"
                queryKey="ventilatorUtilizationRange"
                selectedRangeLabel={ventilatorUtilizationRangeOption.label}>
                <VentilatorUtilizationChart data={ventilatorUtilizationData.chartData}></VentilatorUtilizationChart>
              </ChartCard>
            </div>
            <div className="mt-10">
              <ChartCard
                title="Portable Ventilator Utilization"
                description="Daily portable ventilator capacity utilization"
                queryKey="portableVentilatorUtilizationRange"
                selectedRangeLabel={portableVentilatorUtilizationRangeOption.label}>
                <PortableVentilatorUtilizationChart data={portableVentilatorUtilizationData.chartData}></PortableVentilatorUtilizationChart>
              </ChartCard>
            </div>
            <div className="col-span-2">
              <ChartCard
                title="Ventilator Usage by Type"
                description="Daily ventilator usage by patient type"
                queryKey="ventilatorUsageByTypeRange"
                selectedRangeLabel={ventilatorUsageByTypeRangeOption.label}>
                <VentilatorUsageByTypeChart data={ventilatorUsageByTypeData.chartData}></VentilatorUsageByTypeChart>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
