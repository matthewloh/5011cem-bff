export const STATE_OPTIONS = {
  johor: {
    label: "Johor",
    value: "Johor",
  },
  kedah: {
    label: "Kedah",
    value: "Kedah",
  },
  kelantan: {
    label: "Kelantan",
    value: "Kelantan",
  },
  melaka: {
    label: "Melaka",
    value: "Melaka",
  },
  negeri_sembilan: {
    label: "Negeri Sembilan",
    value: "Negeri Sembilan",
  },
  pahang: {
    label: "Pahang",
    value: "Pahang",
  },
  perak: {
    label: "Perak",
    value: "Perak",
  },
  perlis: {
    label: "Perlis",
    value: "Perlis",
  },
  pulau_pinang: {
    label: "Pulau Pinang",
    value: "Pulau Pinang",
  },
  sabah: {
    label: "Sabah",
    value: "Sabah",
  },
  sarawak: {
    label: "Sarawak",
    value: "Sarawak",
  },
  selangor: {
    label: "Selangor",
    value: "Selangor",
  },
  terengganu: {
    label: "Terengganu",
    value: "Terengganu",
  },
  kuala_lumpur: {
    label: "W.P. Kuala Lumpur",
    value: "W.P. Kuala Lumpur",
  },
  labuan: {
    label: "W.P. Labuan",
    value: "W.P. Labuan",
  },
  putrajaya: {
    label: "W.P. Putrajaya",
    value: "W.P. Putrajaya",
  },
};

export function getStateOption(state: string | undefined) {
  if (state == null) {
    return STATE_OPTIONS.pulau_pinang;
  }

  return STATE_OPTIONS[state as keyof typeof STATE_OPTIONS];
}
