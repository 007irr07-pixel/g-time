// Данные каталога из прайс-листа G-TIME (Январь 2026)

export interface ProductRow {
  size: string;
  thickness?: string;
  steel?: string;
  weight: string;
  pricePerUnit: string;
  pricePerTon: string;
  length: string;
}

export interface SubCategory {
  id: string;
  title: string;
  columns: string[];
  rows: ProductRow[];
  note?: string;
}

export interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  subcategories: SubCategory[];
}

export const catalogData: Record<string, CategoryData> = {
  /* ==============================
     1. ТРУБНЫЙ ПРОКАТ
     ============================== */
  pipes: {
    id: "pipes",
    title: "Трубный прокат",
    subtitle: "Профильные и круглые трубы",
    subcategories: [
      {
        id: "profile",
        title: "Профильная труба (ГОСТ 13663-86)",
        columns: ["Размер, мм", "Толщина, мм", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "15x15", thickness: "1,2 / 1,5", weight: "0,50 / 0,71", pricePerUnit: "310 / 395", pricePerTon: "499 000 / 406 000", length: "6" },
          { size: "20x20", thickness: "1,2 / 1,5", weight: "0,65 / 0,94", pricePerUnit: "392 / 525", pricePerTon: "406 000", length: "6" },
          { size: "25x25", thickness: "1,5 / 2,0", weight: "1,15 / 1,54", pricePerUnit: "647 / 797", pricePerTon: "406 000", length: "6" },
          { size: "30x30", thickness: "1,5 / 2,0", weight: "1,43 / 1,90", pricePerUnit: "773 / 959", pricePerTon: "406 000", length: "6" },
          { size: "40x20", thickness: "1,5 / 2,0", weight: "1,38 / 1,85", pricePerUnit: "749 / 936", pricePerTon: "406 000", length: "6" },
          { size: "40x25", thickness: "1,5 / 2,0", weight: "1,47 / 1,97", pricePerUnit: "791 / 990", pricePerTon: "406 000", length: "6" },
          { size: "40x40", thickness: "1,5 / 2,0", weight: "1,96 / 2,50", pricePerUnit: "1 021 / 1 230", pricePerTon: "395 000", length: "6" },
          { size: "50x25", thickness: "1,5 / 2,0", weight: "1,75 / 2,37", pricePerUnit: "923 / 1 171", pricePerTon: "395 000", length: "6" },
          { size: "50x50", thickness: "1,5 / 2,0", weight: "2,45 / 3,16", pricePerUnit: "1 251 / 1 527", pricePerTon: "395 000", length: "6" },
          { size: "60x40", thickness: "1,5 / 2,0", weight: "2,46 / 3,14", pricePerUnit: "1 356 / 1 518", pricePerTon: "395 000 / 406 000", length: "6" },
          { size: "60x60", thickness: "2,0 / 3,0", weight: "3,96 / 5,23", pricePerUnit: "1 888 / 2 435", pricePerTon: "395 000", length: "6" },
          { size: "80x40", thickness: "1,5 / 2,0", weight: "2,85 / 3,82", pricePerUnit: "1 439 / 1 828", pricePerTon: "435 000", length: "6" },
          { size: "80x80", thickness: "2,0 / 3,0", weight: "5,36 / 6,86", pricePerUnit: "2 519 / 3 098", pricePerTon: "390 000", length: "6" },
          { size: "100x50", thickness: "2,0 / 3,0", weight: "4,95 / 6,25", pricePerUnit: "2 331 / 2 995", pricePerTon: "390 000", length: "6" },
          { size: "100x100", thickness: "2,0 / 3,0", weight: "6,70 / 9,00", pricePerUnit: "3 310 / 4 316", pricePerTon: "390 000", length: "6" },
          { size: "100x100", thickness: "4,0", weight: "11,80", pricePerUnit: "5 456", pricePerTon: "390 000", length: "6" },
          { size: "120x120", thickness: "3,0 / 4,0", weight: "11,50 / 15,0", pricePerUnit: "5 331 / 6 892", pricePerTon: "390 000", length: "12" },
          { size: "140x140", thickness: "4,0", weight: "17,40", pricePerUnit: "7 980", pricePerTon: "435 000", length: "12" },
          { size: "160x160", thickness: "4,0 / 5,0", weight: "19,50 / 23,5", pricePerUnit: "8 899 / 10 560", pricePerTon: "435 000", length: "12" },
        ],
      },
      {
        id: "round",
        title: "Круглая труба (Э/С и ВГП)",
        columns: ["Диаметр, мм", "Толщина, мм", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "15 (ВГП) 21,3x2", thickness: "2,0", weight: "1,05", pricePerUnit: "527", pricePerTon: "402 000", length: "6" },
          { size: "15 (ВГП) 15x2,5", thickness: "2,5", weight: "1,22", pricePerUnit: "589", pricePerTon: "399 000", length: "5,85" },
          { size: "20 (ВГП) 27x2", thickness: "2,0", weight: "1,33", pricePerUnit: "637", pricePerTon: "402 000", length: "6" },
          { size: "20 (ВГП) 20x2,5", thickness: "2,5", weight: "1,56", pricePerUnit: "724", pricePerTon: "399 000", length: "5,85" },
          { size: "25 (ВГП) 33,7x2", thickness: "2,0", weight: "1,70", pricePerUnit: "777", pricePerTon: "397 000", length: "6" },
          { size: "25 (ВГП) 25x2,8", thickness: "2,8", weight: "2,20", pricePerUnit: "769", pricePerTon: "394 000", length: "5,85" },
          { size: "32 (ВГП) 42x2", thickness: "2,0", weight: "2,05", pricePerUnit: "969", pricePerTon: "397 000", length: "6" },
          { size: "32 (ВГП) 32x2,8", thickness: "2,8", weight: "2,86", pricePerUnit: "1 258", pricePerTon: "394 000", length: "5,85" },
          { size: "40 (ВГП) 48x2", thickness: "2,0", weight: "2,40", pricePerUnit: "1 212", pricePerTon: "397 000", length: "6" },
          { size: "40 (ВГП) 40x3", thickness: "3,0", weight: "3,43", pricePerUnit: "1 553", pricePerTon: "394 000", length: "10" },
          { size: "50 (ВГП) 50x3", thickness: "3,0", weight: "4,47", pricePerUnit: "1 963", pricePerTon: "394 000", length: "10" },
          { size: "57 (Э/С) 60x2", thickness: "2,0", weight: "3,05", pricePerUnit: "1 513", pricePerTon: "397 000", length: "6" },
          { size: "76 (Э/С) 76x2", thickness: "2,0", weight: "3,83", pricePerUnit: "1 723", pricePerTon: "397 000", length: "6" },
          { size: "76 (Э/С) 76x3", thickness: "3,0", weight: "5,10", pricePerUnit: "2 211", pricePerTon: "394 000", length: "6" },
          { size: "89 (Э/С) 89x2", thickness: "2,0", weight: "4,55", pricePerUnit: "2 110", pricePerTon: "397 000", length: "6" },
          { size: "89 (Э/С) 89x3", thickness: "3,0", weight: "6,20", pricePerUnit: "2 645", pricePerTon: "394 000", length: "6 / 12" },
          { size: "108 (Э/С) 108x2", thickness: "2,0", weight: "5,50", pricePerUnit: "2 600", pricePerTon: "436 000", length: "6" },
          { size: "108 (Э/С) 108x3", thickness: "3,0", weight: "7,34", pricePerUnit: "3 336", pricePerTon: "431 000", length: "6" },
          { size: "114 (Э/С) 114x3", thickness: "3,0", weight: "7,54", pricePerUnit: "3 600", pricePerTon: "431 000", length: "6" },
          { size: "159 (Э/С) 159x4", thickness: "4,0", weight: "16,00", pricePerUnit: "7 320", pricePerTon: "431 000", length: "11,75" },
          { size: "219 (Э/С) 219x5", thickness: "5,0", weight: "25,00", pricePerUnit: "11 777", pricePerTon: "431 000", length: "11,75" },
        ],
      },
      {
        id: "galvanized",
        title: "Труба оцинкованная (ГОСТ 3262-75)",
        columns: ["Диаметр, мм", "Толщина, мм", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "15 (ВГП) Оцинк.", thickness: "2,5 / 2,8", weight: "1,20 / 1,32", pricePerUnit: "965 / 1 250", pricePerTon: "650 000", length: "7,8" },
          { size: "20 (ВГП) Оцинк.", thickness: "2,5 / 2,8", weight: "1,55 / 1,71", pricePerUnit: "1 350 / 1 450", pricePerTon: "650 000", length: "7,8" },
          { size: "25 (ВГП) Оцинк.", thickness: "2,8 / 3,2", weight: "2,20 / 2,46", pricePerUnit: "1 693 / 1 933", pricePerTon: "635 000", length: "7,8" },
          { size: "32 (ВГП) Оцинк.", thickness: "2,8 / 3,2", weight: "2,81 / 3,20", pricePerUnit: "2 150 / 2 487", pricePerTon: "635 000", length: "7,8" },
          { size: "40 (ВГП) Оцинк.", thickness: "3,0 / 3,5", weight: "3,43 / 3,97", pricePerUnit: "2 633 / 2 967", pricePerTon: "635 000", length: "7,8" },
          { size: "50 (ВГП) Оцинк.", thickness: "3,0 / 3,5", weight: "4,35 / 5,04", pricePerUnit: "3 150 / 3 695", pricePerTon: "635 000", length: "7,8" },
          { size: "65 (ВГП) Оцинк.", thickness: "4,0", weight: "7,30", pricePerUnit: "4 960", pricePerTon: "635 000", length: "7,8" },
          { size: "57 (Э/С) Оцинк.", thickness: "3,0 / 3,5", weight: "4,12 / 4,79", pricePerUnit: "2 919 / 3 471", pricePerTon: "620 000", length: "7,8" },
          { size: "76 (Э/С) Оцинк.", thickness: "3,0 / 3,5", weight: "5,56 / 6,49", pricePerUnit: "3 896 / 4 657", pricePerTon: "620 000", length: "7,8" },
          { size: "76 (Э/С) Оцинк.", thickness: "4,0", weight: "7,31", pricePerUnit: "4 946", pricePerTon: "620 000", length: "7,8" },
          { size: "89 (Э/С) Оцинк.", thickness: "3,5", weight: "7,97", pricePerUnit: "6 526", pricePerTon: "620 000", length: "7,8" },
          { size: "108 (Э/С) Оцинк.", thickness: "3,5 / 4,0", weight: "9,30 / 10,9", pricePerUnit: "6 450 / 7 250", pricePerTon: "620 000 / 640 000", length: "7,8" },
          { size: "133 (Э/С) Оцинк.", thickness: "4,0", weight: "13,11", pricePerUnit: "8 695", pricePerTon: "640 000", length: "7,8" },
          { size: "159 (Э/С) Оцинк.", thickness: "4,0", weight: "16,70", pricePerUnit: "10 975", pricePerTon: "640 000", length: "7,8" },
        ],
      },
    ],
  },

  /* ==============================
     2. СОРТОВОЙ ПРОКАТ
     ============================== */
  beams: {
    id: "beams",
    title: "Сортовой прокат",
    subtitle: "Швеллеры, балки двутавровые, уголки",
    subcategories: [
      {
        id: "channel",
        title: "Швеллер стальной",
        columns: ["Размер", "Марка стали", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "5", steel: "3сп-5", weight: "5,60", pricePerUnit: "2 408", pricePerTon: "430 000", length: "12,05" },
          { size: "6,5У", steel: "3сп-5", weight: "6,30", pricePerUnit: "2 709", pricePerTon: "430 000", length: "11,75" },
          { size: "8У", steel: "3сп-5", weight: "8,00", pricePerUnit: "3 440", pricePerTon: "430 000", length: "12,05" },
          { size: "10П", steel: "3сп-5", weight: "8,95", pricePerUnit: "3 849", pricePerTon: "430 000", length: "12,05" },
          { size: "12П", steel: "3сп-5", weight: "10,85", pricePerUnit: "4 991", pricePerTon: "460 000", length: "12,05" },
          { size: "14П", steel: "3сп-5", weight: "12,90", pricePerUnit: "5 934", pricePerTon: "460 000", length: "12,05" },
          { size: "16", steel: "3сп-5", weight: "14,85", pricePerUnit: "6 831", pricePerTon: "460 000", length: "12,05" },
          { size: "18У", steel: "3сп-5", weight: "17,00", pricePerUnit: "7 820", pricePerTon: "460 000", length: "12,05" },
          { size: "20У", steel: "3сп-5", weight: "19,00", pricePerUnit: "8 740", pricePerTon: "460 000", length: "12,05" },
          { size: "22П", steel: "3сп-5", weight: "21,78", pricePerUnit: "14 157", pricePerTon: "650 000", length: "12,05" },
          { size: "24У", steel: "3сп-5", weight: "26,30", pricePerUnit: "17 095", pricePerTon: "650 000", length: "12,05" },
          { size: "27У", steel: "3сп-5", weight: "29,00", pricePerUnit: "20 300", pricePerTon: "700 000", length: "12,05" },
          { size: "30У", steel: "3сп-5", weight: "32,80", pricePerUnit: "21 320", pricePerTon: "650 000", length: "12,05" },
          { size: "40", steel: "3сп-6", weight: "49,00", pricePerUnit: "34 300", pricePerTon: "700 000", length: "12,05" },
        ],
      },
      {
        id: "ibeam",
        title: "Балка двутавровая",
        columns: ["Номер / Профиль", "Марка стали", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "10 Нормальная", steel: "3пс-5", weight: "11,00", pricePerUnit: "7 590", pricePerTon: "690 000", length: "12,05" },
          { size: "12 Б1", steel: "3пс-5", weight: "9,20", pricePerUnit: "6 348", pricePerTon: "690 000", length: "12,05" },
          { size: "14 Б1", steel: "3сп-5", weight: "11,50", pricePerUnit: "7 935", pricePerTon: "690 000", length: "12,05" },
          { size: "16 Б1", steel: "3сп-5", weight: "13,50", pricePerUnit: "9 315", pricePerTon: "690 000", length: "12,05" },
          { size: "20 Б1", steel: "3сп-5", weight: "22,50", pricePerUnit: "13 500", pricePerTon: "600 000", length: "12,05" },
          { size: "25 Б1", steel: "3сп-5", weight: "28,00", pricePerUnit: "16 240", pricePerTon: "580 000", length: "12,05" },
          { size: "30 Б1", steel: "3сп-5", weight: "34,00", pricePerUnit: "18 870", pricePerTon: "555 000", length: "12,05" },
          { size: "40 Б1", steel: "3сп-5", weight: "59,00", pricePerUnit: "32 037", pricePerTon: "543 000", length: "12,05" },
          { size: "50 Б1", steel: "3сп-5", weight: "75,50", pricePerUnit: "37 373", pricePerTon: "540 000", length: "12,05" },
          { size: "60 Б1", steel: "3сп-5", weight: "97,00", pricePerUnit: "52 380", pricePerTon: "540 000", length: "12,05" },
          { size: "20 К1 (Колонная)", steel: "3сп-5", weight: "43,50", pricePerUnit: "23 925", pricePerTon: "550 000", length: "12,05" },
          { size: "30 К1 (Колонная)", steel: "3сп-5", weight: "92,00", pricePerUnit: "50 140", pricePerTon: "545 000", length: "12,05" },
          { size: "40 К1 (Колонная)", steel: "3сп-5", weight: "150,0", pricePerUnit: "96 000", pricePerTon: "640 000", length: "12,05" },
          { size: "20 Ш1 (Широкая)", steel: "3сп-5", weight: "31,40", pricePerUnit: "17 584", pricePerTon: "560 000", length: "12,05" },
          { size: "30 Ш1 (Широкая)", steel: "3сп-5", weight: "59,00", pricePerUnit: "32 745", pricePerTon: "555 000", length: "12,05" },
          { size: "40 Ш1 (Широкая)", steel: "3сп-5", weight: "92,30", pricePerUnit: "49 842", pricePerTon: "540 000", length: "12,05" },
          { size: "50 Ш1 (Широкая)", steel: "3сп-5", weight: "116,0", pricePerUnit: "56 840", pricePerTon: "550 000", length: "12,05" },
          { size: "60 Ш1 (Широкая)", steel: "3сп-5", weight: "142,0", pricePerUnit: "78 100", pricePerTon: "560 000", length: "12,05" },
          { size: "24 М (Монорельс)", steel: "3сп-5", weight: "40,26", pricePerUnit: "33 821", pricePerTon: "840 000", length: "12,05" },
          { size: "36 М (Монорельс)", steel: "3сп-5", weight: "62,11", pricePerUnit: "52 172", pricePerTon: "840 000", length: "12,05" },
          { size: "45 М (Монорельс)", steel: "3сп-5", weight: "83,43", pricePerUnit: "70 498", pricePerTon: "845 000", length: "12,05" },
        ],
      },
      {
        id: "angle",
        title: "Уголок стальной равнополочный",
        columns: ["Размер, мм", "Марка стали", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "25x25x4", steel: "3пс/сп1-5", weight: "1,56", pricePerUnit: "691", pricePerTon: "443 000", length: "12,05" },
          { size: "32x32x3", steel: "3пс/сп1-5", weight: "1,51", pricePerUnit: "775", pricePerTon: "443 000", length: "6,05" },
          { size: "32x32x4", steel: "3пс/сп1-5", weight: "1,99", pricePerUnit: "882", pricePerTon: "443 000", length: "12,05" },
          { size: "35x35x4", steel: "3пс/сп1-5", weight: "2,30", pricePerUnit: "1 019", pricePerTon: "443 000", length: "11,75" },
          { size: "40x40x4", steel: "3пс/сп1-5", weight: "2,46", pricePerUnit: "1 065", pricePerTon: "433 000", length: "6,05 / 12,05" },
          { size: "45x45x4", steel: "3пс/сп1-5", weight: "3,40", pricePerUnit: "1 346", pricePerTon: "396 000", length: "12,05" },
          { size: "45x45x5", steel: "3пс/сп1-5", weight: "3,50", pricePerUnit: "1 386", pricePerTon: "396 000", length: "12,05" },
          { size: "50x50x4", steel: "3сп5", weight: "3,20", pricePerUnit: "1 267", pricePerTon: "396 000", length: "12,05" },
          { size: "50x50x5", steel: "3сп5", weight: "3,85", pricePerUnit: "1 525", pricePerTon: "396 000", length: "12,05" },
          { size: "63x63x5", steel: "3сп5", weight: "5,25", pricePerUnit: "2 079", pricePerTon: "396 000", length: "11,75 / 12,05" },
          { size: "63x63x6", steel: "3сп5", weight: "5,75", pricePerUnit: "2 375", pricePerTon: "413 000", length: "11,75 / 12,05" },
          { size: "70x70x5", steel: "3сп5", weight: "5,80", pricePerUnit: "2 395", pricePerTon: "413 000", length: "12,05" },
          { size: "70x70x6", steel: "3сп5", weight: "6,35", pricePerUnit: "2 515", pricePerTon: "396 000", length: "12,05" },
          { size: "75x75x5", steel: "3сп5", weight: "5,93", pricePerUnit: "2 348", pricePerTon: "396 000", length: "11,75 / 12,05" },
          { size: "75x75x6", steel: "3сп5", weight: "7,10", pricePerUnit: "2 812", pricePerTon: "396 000", length: "12,05" },
          { size: "75x75x8", steel: "3сп5", weight: "9,00", pricePerUnit: "3 717", pricePerTon: "413 000", length: "11,75 / 12,05" },
          { size: "80x80x6", steel: "3сп5", weight: "7,44", pricePerUnit: "3 073", pricePerTon: "413 000", length: "12,05" },
          { size: "80x80x8", steel: "3сп5", weight: "9,95", pricePerUnit: "4 109", pricePerTon: "413 000", length: "12,05" },
          { size: "90x90x6/7/8", steel: "3сп5", weight: "8,5 / 10,9", pricePerUnit: "4 718 / 6 050", pricePerTon: "396 000", length: "12,05" },
          { size: "100x100x7", steel: "3сп5", weight: "11,12", pricePerUnit: "4 404", pricePerTon: "396 000", length: "11,75 / 12,05" },
          { size: "100x100x8", steel: "3сп5", weight: "12,50", pricePerUnit: "4 950", pricePerTon: "396 000", length: "11,75 / 12,05" },
          { size: "100x100x10", steel: "3сп5", weight: "15,20", pricePerUnit: "6 278", pricePerTon: "413 000", length: "11,75 / 12,05" },
          { size: "110x110x8/7", steel: "3сп5", weight: "13,8 / 12,8", pricePerUnit: "7 659 / 7 104", pricePerTon: "413 000", length: "12,05" },
          { size: "125x125x8/9", steel: "3сп5", weight: "15,9 / 17,5", pricePerUnit: "8 825 / 9 713", pricePerTon: "413 000", length: "11,75 / 12,05" },
          { size: "125x125x10", steel: "3сп5", weight: "19,60", pricePerUnit: "14 386", pricePerTon: "734 000", length: "12,05" },
          { size: "140x140x9", steel: "3сп5", weight: "20,80", pricePerUnit: "15 267", pricePerTon: "734 000", length: "11,05 / 12,05" },
          { size: "140x140x10", steel: "3сп5", weight: "22,10", pricePerUnit: "16 221", pricePerTon: "734 000", length: "12,05" },
          { size: "140x140x12", steel: "3сп5", weight: "26,30", pricePerUnit: "19 304", pricePerTon: "734 000", length: "12,05" },
          { size: "160x160x10", steel: "3сп5", weight: "26,40", pricePerUnit: "23 232", pricePerTon: "734 000", length: "12,05" },
          { size: "180x180x11/12", steel: "3сп5", weight: "30,8 / 34,5", pricePerUnit: "27 104 / 30 360", pricePerTon: "734 000", length: "12,05" },
          { size: "200x200x12-16", steel: "3сп5", weight: "38,8 – 49,8", pricePerUnit: "34 144 – 44 571", pricePerTon: "810 000", length: "12,05" },
          { size: "250x250x16", steel: "3сп5", weight: "61,60", pricePerUnit: "22 795", pricePerTon: "810 000", length: "12,05" },
        ],
      },
    ],
  },

  /* ==============================
     3. ЛИСТОВОЙ ПРОКАТ
     ============================== */
  sheets: {
    id: "sheets",
    title: "Листовой прокат",
    subtitle: "Горячекатаный, холоднокатаный, оцинкованный, рифленый",
    subcategories: [
      {
        id: "hotrolled",
        title: "Лист горячекатаный и рифленый",
        columns: ["Толщина, мм", "Марка стали", "Вес 1 листа, кг", "Раскрой, м"],
        rows: [
          { size: "2,0", steel: "3пс5/3сп5", weight: "34,5 / 55", pricePerUnit: "14 490 / 23 100", pricePerTon: "351 000", length: "1x2 / 1.25x2.5" },
          { size: "2,5", steel: "3пс5/3сп5", weight: "68,00", pricePerUnit: "23 868", pricePerTon: "351 000", length: "1.25x2.5" },
          { size: "3,0", steel: "3сп5", weight: "53 / 80", pricePerUnit: "21 995 / 33 200", pricePerTon: "349 000", length: "1x2 / 1.25x2.5" },
          { size: "4,0", steel: "3сп5", weight: "305", pricePerUnit: "105 225", pricePerTon: "345 000", length: "1.5x6" },
          { size: "5,0", steel: "3сп5", weight: "388", pricePerUnit: "133 860", pricePerTon: "345 000", length: "1.5x6" },
          { size: "6,0", steel: "3сп5", weight: "440", pricePerUnit: "151 800", pricePerTon: "345 000", length: "1.5x6" },
          { size: "8,0", steel: "3сп5 / 09Г2С", weight: "580", pricePerUnit: "200 100", pricePerTon: "345 000", length: "1.5x6" },
          { size: "10,0", steel: "3сп-5 / 09Г2С", weight: "728", pricePerUnit: "251 160", pricePerTon: "345 000", length: "1.5x6" },
          { size: "12,0", steel: "3сп5 / 09Г2С", weight: "875", pricePerUnit: "315 000", pricePerTon: "360 000", length: "1.5x6" },
          { size: "14,0", steel: "3сп5", weight: "1020", pricePerUnit: "504 000", pricePerTon: "360 000", length: "1.5x6" },
          { size: "16,0", steel: "3сп5 / 09Г2С", weight: "1160", pricePerUnit: "440 800", pricePerTon: "380 000", length: "1.5x6" },
          { size: "20,0", steel: "3сп5 / 09Г2С", weight: "1430", pricePerUnit: "543 400", pricePerTon: "380 000", length: "1.5x6" },
          { size: "25,0", steel: "3сп5", weight: "1900", pricePerUnit: "722 000", pricePerTon: "380 000", length: "1.5x6" },
          { size: "30,0", steel: "3сп5", weight: "2185", pricePerUnit: "830 300", pricePerTon: "380 000", length: "1.5x6" },
          { size: "40,0", steel: "3сп5", weight: "2903", pricePerUnit: "1 103 140", pricePerTon: "380 000", length: "1.5x6" },
          { size: "50,0", steel: "3пс/сп 5", weight: "3640", pricePerUnit: "1 383 200", pricePerTon: "380 000", length: "1.5x6" },
          { size: "Рифл. 3 чеч.", steel: "3пс", weight: "80", pricePerUnit: "50 800", pricePerTon: "365 000", length: "1.25x2.5" },
          { size: "Рифл. 4 чеч.", steel: "3пс", weight: "320", pricePerUnit: "116 800", pricePerTon: "365 000", length: "1.5x6" },
        ],
      },
      {
        id: "coldrolled",
        title: "Лист холоднокатаный, оцинковка и ПВЛ",
        columns: ["Тип / Толщина, мм", "Марка стали", "Вес 1 листа, кг", "Раскрой, м"],
        rows: [
          { size: "0,5 (Оцинк.)", steel: "—", weight: "12,80", pricePerUnit: "10 240", pricePerTon: "800 000", length: "1.25x2.5" },
          { size: "0,7 (Оцинк.)", steel: "—", weight: "17,50", pricePerUnit: "14 000", pricePerTon: "800 000", length: "1.25x2.5" },
          { size: "0,5 (Х/К)", steel: "08пс-6", weight: "13,00", pricePerUnit: "10 400", pricePerTon: "800 000", length: "1.25x2.5" },
          { size: "0,8 (Х/К)", steel: "08пс-6", weight: "13 / 21", pricePerUnit: "5 850 / 9 450", pricePerTon: "800 000", length: "1x2.06" },
          { size: "1,0 (Х/К)", steel: "08пс-6", weight: "16,2 / 26", pricePerUnit: "7 209 / 11 570", pricePerTon: "800 000", length: "1x2 / 1.25x2.5" },
          { size: "1,2 (Х/К)", steel: "08пс-6", weight: "20 / 31", pricePerUnit: "8 900 / 13 795", pricePerTon: "800 000", length: "1x2 / 1.25x2.5" },
          { size: "1,5 (Х/К)", steel: "08пс-6", weight: "24,5 / 40", pricePerUnit: "10 903 / 17 800", pricePerTon: "800 000", length: "1x2 / 1.25x2.5" },
          { size: "2,0 (Х/К)", steel: "08пс-6", weight: "34 / 56", pricePerUnit: "15 130 / 24 920", pricePerTon: "800 000", length: "1x2 / 1.25x2.5" },
          { size: "ПВ 303 / 310", steel: "3пс", weight: "15 / 28", pricePerUnit: "—", pricePerTon: "485 000", length: "1.01x2.24" },
          { size: "ПВ 406 / 410", steel: "3пс", weight: "60,0", pricePerUnit: "28 800", pricePerTon: "480 000", length: "1.20x2.7" },
          { size: "ПВ 508", steel: "3пс", weight: "48,0", pricePerUnit: "23 040", pricePerTon: "480 000", length: "0.94x2.5" },
          { size: "ПВ 510", steel: "3пс", weight: "80,0", pricePerUnit: "38 400", pricePerTon: "480 000", length: "1.20x2.7" },
        ],
      },
    ],
  },

  /* ==============================
     4. ФАСОННЫЙ ПРОКАТ
     ============================== */
  angles: {
    id: "angles",
    title: "Фасонный прокат",
    subtitle: "Специальные профили",
    subcategories: [
      {
        id: "custom",
        title: "Швеллер гнутый, Профиль Z-образный, Профлист и др.",
        columns: [],
        rows: [],
        note: "В текущем прайс-листе за январь 2026 года позиции по специальным фасонным профилям отсутствуют. Пожалуйста, обратитесь к вашему менеджеру для уточнения цен и наличия: +7 747 839 06 05",
      },
    ],
  },

  /* ==============================
     5. АРМАТУРА
     ============================== */
  rebar: {
    id: "rebar",
    title: "Арматура",
    subtitle: "Строительная арматура, катанка, проволока",
    subcategories: [
      {
        id: "rebar_steel",
        title: "Арматура стальная (А-III, А500С)",
        columns: ["Диаметр, мм", "Марка стали", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "8/10 (бухт)", steel: "35ГС", weight: "850 кг/б", pricePerUnit: "—", pricePerTon: "360 000", length: "2150 м" },
          { size: "8 (тян)", steel: "35ГС", weight: "0,40", pricePerUnit: "—", pricePerTon: "370 000", length: "6,2" },
          { size: "10", steel: "A500C", weight: "0,62", pricePerUnit: "—", pricePerTon: "370 000", length: "11,75" },
          { size: "12", steel: "A500C", weight: "0,90", pricePerUnit: "—", pricePerTon: "315 000", length: "11,75" },
          { size: "14", steel: "A500C", weight: "1,24 / 1,3", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "16", steel: "A500C", weight: "1,63 / 1,7", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "18", steel: "A500C", weight: "2,1 / 2,3", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "20", steel: "A500C", weight: "2,53 / 2,6", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "22", steel: "A500C", weight: "3,05 / 3,1", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "25", steel: "A500C", weight: "3,98 / 4,1", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "28", steel: "A500C", weight: "4,99 / 5", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "32", steel: "A500C", weight: "6,85 / 7,1", pricePerUnit: "—", pricePerTon: "310 000", length: "11,75 / 12" },
          { size: "36", steel: "35ГС", weight: "9 / 9,1", pricePerUnit: "—", pricePerTon: "330 000", length: "11,75 / 12" },
        ],
      },
      {
        id: "round_bar",
        title: "Круг стальной (Пруток / Катанка)",
        columns: ["Диаметр, мм", "Марка стали", "Вес 1 п.м., кг", "Длина, м"],
        rows: [
          { size: "10 бух.", steel: "3пс/сп-1", weight: "0,85", pricePerUnit: "311", pricePerTon: "350 000", length: "11,75" },
          { size: "12", steel: "3пс/сп-1", weight: "0,90", pricePerUnit: "311", pricePerTon: "345 000", length: "12,05 / 11,75" },
          { size: "14", steel: "3пс/сп-5", weight: "1,21", pricePerUnit: "399", pricePerTon: "330 000", length: "11,75" },
          { size: "16", steel: "3пс", weight: "1,61", pricePerUnit: "531", pricePerTon: "330 000", length: "11,75" },
          { size: "18", steel: "3пс", weight: "2,05", pricePerUnit: "677", pricePerTon: "330 000", length: "11,75" },
          { size: "20", steel: "3пс-1-1гп", weight: "2,50", pricePerUnit: "825", pricePerTon: "330 000", length: "11,75" },
          { size: "22", steel: "3пс-1-1гп", weight: "3,00", pricePerUnit: "990", pricePerTon: "330 000", length: "11,75" },
          { size: "24", steel: "3пс/сп-1", weight: "3,59", pricePerUnit: "1 185", pricePerTon: "330 000", length: "11,75" },
          { size: "25", steel: "3пс/сп-1", weight: "3,95", pricePerUnit: "1 304", pricePerTon: "330 000", length: "11,75" },
          { size: "28", steel: "3пс/сп1", weight: "4,95", pricePerUnit: "1 733", pricePerTon: "350 000", length: "11,75" },
          { size: "30", steel: "3пс/сп1", weight: "6,00", pricePerUnit: "2 100", pricePerTon: "350 000", length: "11,75" },
          { size: "32", steel: "3пс/сп1", weight: "6,90", pricePerUnit: "2 415", pricePerTon: "350 000", length: "11,75" },
          { size: "36", steel: "3пс-2 / 45", weight: "8,98", pricePerUnit: "3 143", pricePerTon: "350 000", length: "11,75 / 12,05" },
          { size: "40", steel: "3сп-1", weight: "10,20", pricePerUnit: "3 570", pricePerTon: "350 000", length: "12,05" },
          { size: "42", steel: "4сп-1", weight: "11,00", pricePerUnit: "3 850", pricePerTon: "350 000", length: "12,05" },
          { size: "48", steel: "3пс/сп1", weight: "14,80", pricePerUnit: "5 476", pricePerTon: "370 000", length: "12,05" },
          { size: "50", steel: "3", weight: "15,90", pricePerUnit: "5 883", pricePerTon: "370 000", length: "12,05" },
          { size: "60", steel: "3пс/сп-5", weight: "23,00", pricePerUnit: "8 510", pricePerTon: "370 000", length: "6,05" },
        ],
      },
      {
        id: "mesh",
        title: "Сетка кладочная (ВР-1)",
        columns: ["Размер ячейки", "Тип (Ф)", "Вес 1 шт, кг", "Размер карты, м"],
        rows: [
          { size: "10x10 мм", steel: "ВР-1 Ф3", weight: "3,30", pricePerUnit: "1 695", pricePerTon: "", length: "1x3" },
          { size: "15x15 мм", steel: "ВР-1 Ф3", weight: "2,20", pricePerUnit: "1 155", pricePerTon: "", length: "1x3" },
          { size: "20x20 мм", steel: "ВР-1 Ф3", weight: "1,80", pricePerUnit: "900", pricePerTon: "", length: "1x3" },
          { size: "10x10 мм", steel: "ВР-1 Ф4", weight: "5,90", pricePerUnit: "2 940", pricePerTon: "", length: "1x3" },
          { size: "15x15 мм", steel: "ВР-1 Ф4", weight: "4,00", pricePerUnit: "1 985", pricePerTon: "", length: "1x3" },
          { size: "20x20 мм", steel: "ВР-1 Ф4", weight: "3,00", pricePerUnit: "1 499", pricePerTon: "", length: "1x3" },
          { size: "10x10 мм", steel: "ВР-1 Ф5", weight: "9,00", pricePerUnit: "4 557", pricePerTon: "", length: "1x3" },
          { size: "15x15 мм", steel: "ВР-1 Ф5", weight: "6,00", pricePerUnit: "3 087", pricePerTon: "", length: "1x3" },
          { size: "20x20 мм", steel: "ВР-1 Ф5", weight: "4,80", pricePerUnit: "2 337", pricePerTon: "", length: "1x3" },
        ],
      },
    ],
  },
};
