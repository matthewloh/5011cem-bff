import asyncio
from datetime import datetime as dt
from pathlib import Path

import numpy as np
import pandas as pd
from prisma.models import StateEpidemic

from prisma import Prisma

# Batch size for bulk inserts
BATCH_SIZE = 1000

CSV_NAME = Path(__file__).resolve().parent / "state_epidemic.csv"

""" 
model StateEpidemic {
  id               Int      @id
  date             DateTime
  state            String
  cases_new        Int
  cases_import     Int
  cases_recovered  Int
  cases_active     Int
  cases_cluster    Int
  cases_unvax      Int
  cases_pvax       Int
  cases_fvax       Int
  cases_boost      Int
  cases_0_4        Int
  cases_5_11       Int
  cases_12_17      Int
  cases_18_29      Int
  cases_30_39      Int
  cases_40_49      Int
  cases_50_59      Int
  cases_60_69      Int
  cases_70_79      Int
  cases_80         Int
  deaths_new       Int
  deaths_bid       Int
  deaths_new_dod   Int
  deaths_bid_dod   Int
  deaths_unvax     Int
  deaths_pvax      Int
  deaths_fvax      Int
  deaths_boost     Int
  beds             Int
  beds_covid       Int
  beds_noncrit     Int
  admitted_pui     Int
  admitted_covid   Int
  admitted_total   Int
  discharged_pui   Int
  discharged_covid Int
  discharged_total Int
  hosp_covid       Int
  hosp_pui         Int
  hosp_noncovid    Int
  beds_icu         Int
  beds_icu_rep     Int
  beds_icu_total   Int
  beds_icu_covid   Int
  vent             Int
  vent_port        Int
  icu_covid        Int
  icu_pui          Int
  icu_noncovid     Int
  vent_covid       Int
  vent_pui         Int
  vent_noncovid    Int
  vent_used        Int
  vent_port_used   Int
  rtk_ag           Int
  pcr              Int
}
"""


def process_chunk(chunk):
    processed_data = []
    for row in chunk.itertuples():
        # print(row[1]) # id
        # print(row[2]) # date
        # CSV Format is 2024-06-01
        date = dt.strptime(row[2], "%d/%m/%Y").strftime("%Y-%m-%d")
        date_obj = dt.strptime(date, "%Y-%m-%d")
        # date_obj = dt.strptime(row[2], "%Y-%m-%d")
        # print(date_obj)
        state_epidemic = StateEpidemic(
            id=row[1] + 1,
            # Original Date Format = DD/MM/YYYY
            date=date_obj,
            state=row[3],
            cases_new=row[4],
            cases_import=row[5],
            cases_recovered=row[6],
            cases_active=row[7],
            cases_cluster=row[8],
            cases_unvax=row[9],
            cases_pvax=row[10],
            cases_fvax=row[11],
            cases_boost=row[12],
            cases_0_4=row[13],
            cases_5_11=row[14],
            cases_12_17=row[15],
            cases_18_29=row[16],
            cases_30_39=row[17],
            cases_40_49=row[18],
            cases_50_59=row[19],
            cases_60_69=row[20],
            cases_70_79=row[21],
            cases_80=row[22],
            deaths_new=row[23],
            deaths_bid=row[24],
            deaths_new_dod=row[25],
            deaths_bid_dod=row[26],
            deaths_unvax=row[27],
            deaths_pvax=row[28],
            deaths_fvax=row[29],
            deaths_boost=row[30],
            beds=row[31],
            beds_covid=row[32],
            beds_noncrit=row[33],
            admitted_pui=row[34],
            admitted_covid=row[35],
            admitted_total=row[36],
            discharged_pui=row[37],
            discharged_covid=row[38],
            discharged_total=row[39],
            hosp_covid=row[40],
            hosp_pui=row[41],
            hosp_noncovid=row[42],
            beds_icu=row[43],
            beds_icu_rep=row[44],
            beds_icu_total=row[45],
            beds_icu_covid=row[46],
            vent=row[47],
            vent_port=row[48],
            icu_covid=row[49],
            icu_pui=row[50],
            icu_noncovid=row[51],
            vent_covid=row[52],
            vent_pui=row[53],
            vent_noncovid=row[54],
            vent_used=row[55],
            vent_port_used=row[56],
            rtk_ag=row[57],
            pcr=row[58],
        )
        processed_data.append(state_epidemic.model_dump())
    return processed_data


async def parse_csv():
    prisma = Prisma()
    await prisma.connect()

    df = pd.read_csv(CSV_NAME)
    df = df.replace(np.nan, None, regex=True)

    num_chunks = len(df) // BATCH_SIZE + 1
    chunks = np.array_split(df, num_chunks)

    for chunk in chunks:
        processed_data = process_chunk(chunk)
        # print(processed_data)
        await prisma.stateepidemic.create_many(data=processed_data, skip_duplicates=True)
    await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(parse_csv())
