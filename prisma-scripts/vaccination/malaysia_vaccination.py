import asyncio
from datetime import datetime as dt
from pathlib import Path

import numpy as np
import pandas as pd
from prisma.models import MalaysiaVaccination

from prisma import Prisma

BATCH_SIZE = 1000

CSV_NAME = Path(__file__).resolve().parent / "malaysia_vaccinationNO_ID.csv"

"""
model MalaysiaVaccination {
  id                   Int       @id @default(autoincrement())
  date                 DateTime?
  daily_partial        Int?
  daily_full           Int?
  daily_booster        Int?
  daily_booster2       Int?
  daily                Int?
  daily_partial_adol   Int?
  daily_full_adol      Int?
  daily_booster_adol   Int?
  daily_booster2_adol  Int?
  daily_partial_child  Int?
  daily_full_child     Int?
  daily_booster_child  Int?
  daily_booster2_child Int?
  cumul_partial        Int?
  cumul_full           Int?
  cumul_booster        Int?
  cumul_booster2       Int?
  cumul                Int?
  cumul_partial_adol   Int?
  cumul_full_adol      Int?
  cumul_booster_adol   Int?
  cumul_booster2_adol  Int?
  cumul_partial_child  Int?
  cumul_full_child     Int?
  cumul_booster_child  Int?
  cumul_booster2_child Int?
  pfizer1              Int?
  pfizer2              Int?
  pfizer3              Int?
  pfizer4              Int?
  sinovac1             Int?
  sinovac2             Int?
  sinovac3             Int?
  sinovac4             Int?
  astra1               Int?
  astra2               Int?
  astra3               Int?
  astra4               Int?
  sinopharm1           Int?
  sinopharm2           Int?
  sinopharm3           Int?
  sinopharm4           Int?
  cansino              Int?
  cansino3             Int?
  cansino4             Int?
  pending1             Int?
  pending2             Int?
  pending3             Int?
  pending4             Int?
}
"""


def process_chunk(chunk):
    processed_data = []
    for row in chunk.itertuples():
        # This CSV does not have an ID column
        # print(row[0] + 1, row[1])  # id
        # print(row[1]) # date
        # CSV Format is 2024-06-01

        date_obj = dt.strptime(row[1], "%d/%m/%Y")
        # print(date_obj)

        malaysia_vaccination = MalaysiaVaccination(
            id=row[0] + 1,
            date=date_obj,
            daily_partial=row[2],
            daily_full=row[3],
            daily_booster=row[4],
            daily_booster2=row[5],
            daily=row[6],
            daily_partial_adol=row[7],
            daily_full_adol=row[8],
            daily_booster_adol=row[9],
            daily_booster2_adol=row[10],
            daily_partial_child=row[11],
            daily_full_child=row[12],
            daily_booster_child=row[13],
            daily_booster2_child=row[14],
            cumul_partial=row[15],
            cumul_full=row[16],
            cumul_booster=row[17],
            cumul_booster2=row[18],
            cumul=row[19],
            cumul_partial_adol=row[20],
            cumul_full_adol=row[21],
            cumul_booster_adol=row[22],
            cumul_booster2_adol=row[23],
            cumul_partial_child=row[24],
            cumul_full_child=row[25],
            cumul_booster_child=row[26],
            cumul_booster2_child=row[27],
            pfizer1=row[28],
            pfizer2=row[29],
            pfizer3=row[30],
            pfizer4=row[31],
            sinovac1=row[32],
            sinovac2=row[33],
            sinovac3=row[34],
            sinovac4=row[35],
            astra1=row[36],
            astra2=row[37],
            astra3=row[38],
            astra4=row[39],
            sinopharm1=row[40],
            sinopharm2=row[41],
            sinopharm3=row[42],
            sinopharm4=row[43],
            cansino=row[44],
            cansino3=row[45],
            cansino4=row[46],
            pending1=row[47],
            pending2=row[48],
            pending3=row[49],
            pending4=row[50]
        )
        processed_data.append(malaysia_vaccination.model_dump())
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
        await prisma.malaysiavaccination.create_many(data, skip_duplicates=True)

    # await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(parse_csv())
