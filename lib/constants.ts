import { AttestationCard, Config, HeaderLink, HowItWorksCardType, ServiceFeaturesCardTypes } from "./types";
//Can be stored in .env file somehow
export const config: Config = {
  ATTESTATOR_CONTRACT_ADDRESS: '0xae7337bD18921781D56676E42608fF2a05cFff7e',
  CHAIN_ID: '0x1b198',
};

export const DATE_FORMAT_OPTS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
};

export const headerNavigationList: HeaderLink[] = [
  {
    url: '/attestator',
    label: 'Проводник',
  },
  {
    url: '/create-schema',
    label: 'Создание схем',
  },
  {
    url: '/attesting',
    label: 'Аттестация',
  },
]

export const serviceFeaturesCards: ServiceFeaturesCardTypes[] = [
  {
    title: 'Формирование<br>цифровых артефактов',
    description: 'описания личности для пользователей сети',
  },
  {
    title: 'Участие гос.<br>институтов',
    description: 'в блокчейн-сети через современные механизмы.',
  },
  {
    title: 'Идентификация<br>пользователей',
    description: 'Веб3-приложений без раскрытия их персональных данных.',
  },
  {
    title: 'Отражение<br>статуса',
    description: 'социального, финансового и юридического из реального мира в блокчейн',
  },
  {
    title: 'Оценка своих<br>пользователей',
    description: 'Веб3-приложениями с точки зрения социальной значимости',
  },
  {
    title: 'Сведения от<br>доверенных институтов',
    description: 'Возможность участникам ориентироваться на надежность пользователей при принятии решений',
  },
];

export const attestationList: AttestationCard[] = [
  {
    title: 'Аттестации от доверенных институтов',
    list: [
      'Проверка аттестации осуществляется без раскрытия персональных данных.',
      'Данные защищены эллиптическим шифрованием.',
      'Аттестации сформированы в соответствии с заранее определенным шаблоном.',
      'Возможность установки срока действия аттестации.',
    ],
  },
  {
    title: 'Аттестации от приложений и пользователей сети',
    list: [
      'Данные открыты для всех участников сети.',
      'Возможность формирования аттестации в соответствии с шаблоном.',
      'Возможность свободного формирования данных для аттестации.',
      'Возможность установки срока действия аттестации.',
    ],
  },
]

export const howItWorksList: HowItWorksCardType[] = [
  {
    title: 'Смарт-контракт AttestaSafe',
    list: [
      {
        icon: 'gear-icon.svg',
        text: 'Функционал для работы со свидетельствами и схемами',
      },
      {
        icon: 'register-icon.svg',
        text: 'Реестр (хранилище) свидетельств',
      },
      {
        icon: 'member-types-icon.svg',
        text: 'Управление типами участников',
      },
    ],
  },
  {
    title: 'FrontEnd<br>dApp',
    list: [
      {
        icon: 'search-icon.svg',
        text: 'Поисковик свидетельств',
      },
      {
        icon: 'create-icon.svg',
        text: 'Создание свидетельств',
      },
      {
        icon: 'constructor-icon.svg',
        text: 'Конструктор схем свидетельств',
      },
      {
        icon: 'lock-icon.svg',
        text: 'Аутентификация через блокчейн-кошелёк',
      },
    ],
  },
]

export const SchemaFieldTypes = [
  "int8",
  "int16",
  "int32",
  "int64",
  "int128",
  "int256",
  "uint8",
  "uint16",
  "uint32",
  "uint64",
  "uint128",
  "uint256",
  "int",
  "uint",
  "int[]",
  "int8[]",
  "int16[]",
  "int32[]",
  "int64[]",
  "int128[]",
  "int256[]",
  "uint[]",
  "uint8[]",
  "uint16[]",
  "uint32[]",
  "uint64[]",
  "uint128[]",
  "uint256[]",
  "string",
  "string[]",
  "bool",
  "bool[]",
  "bytes",
  "bytes[]",
];

export const DynamicFieldArraysTypes = [
  "int[]",
  "int8[]",
  "int16[]",
  "int32[]",
  "int64[]",
  "int128[]",
  "int256[]",
  "uint[]",
  "uint8[]",
  "uint16[]",
  "uint32[]",
  "uint64[]",
  "uint128[]",
  "uint256[]",
  "string[]",
  "bool[]",
  "bytes[]",
];
