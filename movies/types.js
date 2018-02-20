module.exports = {
  'Blu-Ray': {
    prices: {
      buyIn: [0, 1],
      discOnly: [2, 3],
      discPlus: [2, 3, 4, 5, 6],
      coverArtOnly: [4, 5]
    },
    optionGroups: [
      'BuyIn Condition',
      'Buyin Contents Included',
      'Disc Label Condition Details',
      'Disc Functional Status',
      'Coverart Conition Details',
      'Coverart Overall Condition',
      'Contents Included'
    ]
  },
  'DVD': {
    prices: {
      buyIn: [0, 1],
      discOnly: [2, 3],
      discPlus: [2, 3, 4, 5, 6],
      coverArtOnly: [4, 5]
    },
    optionGroups: [
      'BuyIn Condition',
      'Buyin Contents Included',
      'Disc Label Condition Details',
      'Disc Functional Status',
      'Coverart Conition Details',
      'Coverart Overall Condition',
      'Contents Included'
    ]
  },
  'UMD': {
    prices: {
      buyIn: [0, 1],
      instructionManual: [2, 3],
      coverArt: [9, 10],
      cartOnly: [4, 5],
      cartPlus: [2, 3, 4, 5, 6, 7, 8, 9, 10]
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
    ]
  }
}
