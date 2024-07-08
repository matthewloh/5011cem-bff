import asyncio
from datetime import datetime as dt
from pathlib import Path

import numpy as np
import pandas as pd
from prisma.models import MalaysiaEpidemic

from prisma import Prisma

# Batch size for bulk inserts
BATCH_SIZE = 1000

CSV_NAME = Path(__file__).resolve().parent / "malaysia_epidemicHAS_ID.csv"
# Function to process a chunk of data and prepare for insertion

""" 
model MalaysiaEpidemic {
  id               Int      @id
  date             DateTime?
  deaths_new       Int?
  deaths_bid       Int?
  deaths_new_dod   Int?
  deaths_bid_dod   Int?
  deaths_unvax     Int?
  deaths_pvax      Int?
  deaths_fvax      Int?
  deaths_boost     Int?
  cases_new        Int?
  cases_import     Int?
  cases_recovered  Int?
  cases_active     Int?
  cases_cluster    Int?
  cases_unvax      Int?
  cases_pvax       Int?
  cases_fvax       Int?
  cases_boost      Int?
#   cases_child      Int?
#   cases_adolescent Int?
#   cases_adult      Int?
#   cases_elderly    Int?
  cases_0_4        Int?
  cases_5_11       Int?
  cases_12_17      Int?
  cases_18_29      Int?
  cases_30_39      Int?
  cases_40_49      Int?
  cases_50_59      Int?
  cases_60_69      Int?
  cases_70_79      Int?
  cases_80         Int?
  rtk_ag           Int?
  pcr              Int?
  @@index([date])
}

"""


def process_chunk(chunk):
    processed_data = []
    for row in chunk.itertuples():
        # print(row[1]) # id
        # print(row[2]) # date
        # CSV Format is 2024-06-01

        date_obj = dt.strptime(row[2], "%d/%m/%Y")
        # print(date_obj)
        malaysia_epidemic = MalaysiaEpidemic(
            id=row[1] + 1,
            date=date_obj,
            deaths_new=row[3],
            deaths_bid=row[4],
            deaths_new_dod=row[5],
            deaths_bid_dod=row[6],
            deaths_unvax=row[7],
            deaths_pvax=row[8],
            deaths_fvax=row[9],
            deaths_boost=row[10],
            cases_new=row[11],
            cases_import=row[12],
            cases_recovered=row[13],
            cases_active=row[14],
            cases_cluster=row[15],
            cases_unvax=row[16],
            cases_pvax=row[17],
            cases_fvax=row[18],
            cases_boost=row[19],
            cases_child=row[20],
            cases_adolescent=row[21],
            cases_adult=row[22],
            cases_elderly=row[23],
            cases_0_4=row[24],
            cases_5_11=row[25],
            cases_12_17=row[26],
            cases_18_29=row[27],
            cases_30_39=row[28],
            cases_40_49=row[29],
            cases_50_59=row[30],
            cases_60_69=row[31],
            cases_70_79=row[32],
            cases_80=row[33],
            rtk_ag=row[34],
            pcr=row[35],
        )
        processed_data.append(malaysia_epidemic.model_dump())
    return processed_data


async def parse_csv():
    prisma = Prisma()
    await prisma.connect()

    df = pd.read_csv(CSV_NAME)
    df = df.replace(np.nan, None, regex=True)

    # Divide dataframe into chunks of BATCH_SIZE
    num_chunks = len(df) // BATCH_SIZE + 1
    chunks = np.array_split(df, num_chunks)

    for chunk in chunks:
        data = process_chunk(chunk)
        # Perform bulk upsert operation
        # print(data)
        await prisma.malaysiaepidemic.create_many(data, skip_duplicates=True)

    # await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(parse_csv())
