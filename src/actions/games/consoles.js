module.exports = {
  'Atari 2600': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 0.75,
      instructionManual: 0.25
    },
    bundles: {
      cartPlus: [
        { priceName: 'Cartridge', percentage: 0.0, required: true },
        { priceName: 'Game Box', percentage: 0.0, required: true },
        { priceName: 'Instruction Manual', percentage: 0.0, required: true }
      ],
      buyIn: [
        { priceName: 'Cartridge', percentage: 1.10 },
        { priceName: 'Game Box', percentage: 1.25 },
        { priceName: 'Instruction Maunal', percentage: 1.25 }
      ]
    }
  },
  'Atari 5200': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 8, 10, 11],
      gameBox: [7, 8],
      gameOverlay: [10, 11]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included',
      'Game Overlay Condition Details',
      'Game Overlay Overall Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 0.5,
      instructionManual: 0.5
    },
    bundles: {
      cartPlus: [
        { priceName: 'Cartridge', percentage: 0.0, required: true },
        { priceName: 'Game Box', percentage: 0.0, required: true },
        { priceName: 'Instruction Manual', percentage: 0.0, required: true }
      ],
      buyIn: [
        { priceName: 'Cartridge', percentage: 1.25 },
        { priceName: 'Game Box', percentage: 1.25 },
        { priceName: 'Instruction Maunal', percentage: 1.1 }
      ]
    }
  },
  'Atari 7800': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    },
    bundles: {
      cartPlus: [
        { priceName: 'Cartridge', percentage: 0.0, required: true },
        { priceName: 'Game Box', percentage: 0.0, required: true },
        { priceName: 'Instruction Manual', percentage: 0.0, required: true }
      ],
      buyIn: [
        { priceName: 'Cartridge', percentage: 1.10 },
        { priceName: 'Game Box', percentage: 1.25 },
        { priceName: 'Instruction Maunal', percentage: 1.25 }
      ]
    }
  },
  'Atari Jaguar': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      gameBox: [7, 8],
      gameOverlay: [10, 11]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included',
      'Game Overlay Overall Condition',
      'Game Overlay Condition Details'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Atari Lynx': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Coleco Colecovision': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      gameBox: [7, 8],
      gameOverlay: [10, 11]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included',
      'Game Overlay Overall Condition',
      'Game Overlay Condition Details'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Commodore 64': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Magnavox Odyssey 2': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Matel Intellivision': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      gameBox: [7, 8],
      gameOverlay: [10, 11]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included',
      'Game Overlay Overall Condition',
      'Game Overlay Condition Details'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Microsoft Xbox 360': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.1
    }
  },
  'Microsoft Xbox One': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.1
    }
  },
  'Microsoft Xbox': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.75,
      coverArt: 0.25,
      instructionManual: 0.25
    }
  },
  'NEC Turbo Duo': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      rearArt: [8, 9]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Front Insert (Instruction Manual) Overall Condition',
      'Front Insert (Instruction Manual) Condition Details',
      'Rear Insert Overall Condition',
      'Rear Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.75,
      rearArt: 0.5,
      instructionManual: 0.3
    }
  },
  'NEC Turbo Grafx 16': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      huCardOnly: [4, 5],
      huCardPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      rearInsert: [8, 9],
      retailBox: [13, 14]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'HuCard Label Condition',
      'HuCard Functional Status',
      'Front Insert (Instruction Manual) Overall Condition',
      'Front Insert (Instruction Manual) Condition Details',
      'Rear Insert Overall Condition',
      'Rear Insert Condition Details',
      'Game Case Condition',
      'Contents Included',
      'HuCard Sleeve Condition',
      'Retail box Overall Condition',
      'Retail Box Condition Details'
    ],
    priceConversions: {
      huCardOnly: 1.0,
      retailBox: 0.5,
      instructionManual: 0.5
    }
  },
  'Neo Geo AES': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included',
    ],
    priceConversions: {
      cartOnly: 0.75,
      gameBox: 0.5,
      instructionManual: 0.5
    }
  },
  'Neo Geo MVS': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Mini Marquee Overall Condition',
      'Mini Marquee Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Neo Geo Pocket': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      retailBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      retailBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo 3DS': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo DS': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8 ,9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Gameboy Color': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Gamecube': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8 ,9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.75,
      coverArt: 0.35,
      instructionManual: 0.35
    }
  },
  'Nintendo GBA Gameboy Advance': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Gameboy': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo N64': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo NES': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo SNES Super': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Switch': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Virtual Boy': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Nintendo Wii U': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.25
    }
  },
  'Nintendo Wii': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.25
    }
  },
  'Nokia N Gage': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Panasonic 3DO': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      rearArt: [8, 9],
      longbox: [12, 13]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Front Insert (Instruction Manual)  Overall Condition',
      'Front Insert (Instruction Manual) Condition Details',
      'Rear Insert Overall Condition',
      'Rear Insert Condition Details',
      'Game Case Condition',
      'Contents Included',
      'Longbox Overall Condition',
      'Longbox Condition Details'
    ],
    priceConversions: {
      discOnly: 0.8,
      longbox: 0.4,
      instructionManual: 0.25,
      rearArt: 0.15
    }
  },
  'Phillips CD-i': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5, 6],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      gameBox: [9, 10],
      jewel: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Longbox Overall Condition',
      'Longbox Condition Details'
    ],
    priceConversions: {
      discOnly: 0.85,
      jewel: 0.35,
      instructionManual: 0.2
    }
  },
  'Sega 32X': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Sega CD': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5, 6],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      rearArt: [9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Rear Artwork Insert Overall Condition',
      'Rear Artwork Insert Condition Details'
    ],
    priceConversions: {
      discOnly: 0.75,
      rearArt: 0.35,
      instructionManual: 0.3
    }
  },
  'Sega Dreamcast': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5, 6],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      rearArt: [9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Rear Artwork Insert Overall Condition',
      'Rear Artwork Insert Condition Details'
    ],
    priceConversions: {
      discOnly: 0.,
      rearArt: 0.25,
      instructionManual: 0.25
    }
  },
  'Sega Game Gear': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  },
  'Sega Genesis': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Sega Master System': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9 ,10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 1.25,
      instructionManual: 0.5
    }
  },
  'Sega Saturn': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5, 6],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      rearArt: [9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Rear Artwork Insert Overall Condition',
      'Rear Artwork Insert Condition Details'
    ],
    priceConversions: {
      discOnly: 0.6,
      rearArt: 0.3,
      instructionManual: 0.4
    }
  },
  'Sony PS4 Playstation 4': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.2
    }
  },
  'Sony PS3 Playstation 3': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.2
    }
  },
  'Sony PS2 Playstation 2': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      coverArt: [6, 7]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Top Label Condition',
      'Game Disc Functional Status',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Game Case Condition',
      'Contents Included'
    ],
    priceConversions: {
      discOnly: 0.85,
      coverArt: 0.25,
      instructionManual: 0.2
    }
  },
  'Sony PS1 Playstation 1': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      discOnly: [4, 5, 6],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      rearArt: [9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Game Disc Label Condition',
      'Game Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Rear Artwork Insert Overall Condition',
      'Rear Artwork Insert Condition Details'
    ],
    priceConversions: {
      discOnly: 0.75,
      coverArt: 0.3,
      instructionManual: 0.4
    }
  },
  'Sony PSP': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [9, 10],
      discOnly: [4, 5],
      discPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'UMD Disc Shell Condition',
      'UMD Disc Functional Status',
      'Game Case Overall Condition',
      'Game Case Condition Details',
      'Contents Included',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details'
    ],
    priceConversions: {
      discOnly: 1.0,
      coverArt: 0.25,
      instructionManual: 0.2
    }
  },
  'Sony PSP Vita': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [7, 8],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Artwork Insert Overall Condition',
      'Artwork Insert Condition Details',
      'Contents Included',
      'Game Case Condition'
    ],
    priceConversions: {
      cartOnly: 1.0,
      coverArt: 0.25,
      instructionManual: 0.2
    }
  },
  'Vectrex': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      cartOnly: [4, 5, 6],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9],
      gameBox: [7, 8]
    },
    optionGroups: [
      'Buy In Contents Included',
      'Condition',
      'Instruction Manual Overall Condition',
      'Instruction Manual Condition Details',
      'Cartridge Overall Condition',
      'Cartridge Functional Status',
      'Cartridge Condition Details',
      'Game Box Overall Condition',
      'Game Box Condition Details',
      'Contents Included'
    ],
    priceConversions: {
      cartOnly: 1.0,
      gameBox: 1.25,
      instructionManual: 0.5
    }
  }
}
