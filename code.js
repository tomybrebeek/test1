import { Kekule } from 'kekule';



class OrganicMolecule {
  constructor() {
    this.carbonChainLength = this.getRandomCarbonChainLength();
    this.functionalGroup = this.getRandomFunctionalGroup();
    this.functionalGroupPosition = this.getRandomFunctionalGroupPosition();
    this.sideChains = this.getRandomSideChains();
  }

  // Method to generate a random carbon chain length between 1 and 20
  getRandomCarbonChainLength() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // Method to select a random functional group from a list
  getRandomFunctionalGroup() {
    const functionalGroups = [
      { name: 'Alkane', smarts: '', required_length: 1, required_position: 0},
      { name: 'Alkene', smarts: '=', required_length: 2, required_position: 0},
      { name: 'Alkyne', smarts: '#', required_length: 2, required_position: 0},
      { name: 'Alcohol', smarts: 'O', required_length: 1, required_position: 0},
      { name: 'Aldehyde', smarts: '=O', required_length: 1, required_position: 1},
      { name: 'Ketone', smarts: '(=O)', required_length: 3, required_position: 2},
      { name: 'Carboxylic Acid', smarts: '(=O)O', required_length: 1, required_position: 1},
      { name: 'Acid Chloride', smarts: '(=O)Cl', required_length: 1, required_position: 1},
      { name: 'Amine', smarts: 'N', required_length: 1, required_position: 0},
      { name: 'Amide', smarts: '(=O)N', required_length: 1, required_position: 1}
    ];


    // Filter valid functional groups
  const validFunctionalGroups = functionalGroups.filter(group => group.required_length <= this.carbonChainLength);

  if (validFunctionalGroups.length > 0) {
    const selectedGroup = validFunctionalGroups[Math.floor(Math.random() * validFunctionalGroups.length)];
    return selectedGroup;
    // Use selectedGroup.smarts for SMILES generation
  } else {
    this.console.log('error!')
  };
}


getRandomFunctionalGroupPosition() {
    const chainLength = this.carbonChainLength;
  const group = this.functionalGroup;

  // Define valid positions for each functional group
  let validPositions = [];

  if (group.required_position === 2) {
    // Ketone cannot be on terminal carbons (positions 1 or chainLength)
    validPositions = Array.from({ length: chainLength - 2 }, (_, i) => i + 2);
  } else if (group.required_position === 1) {
    // Carboxylic acid only on the end carbon (position 1 or chainLength)
    validPositions = [1, chainLength];
  } else {
    // For other groups, assume they can be anywhere
    validPositions = Array.from({ length: chainLength }, (_, i) => i + 1);
  }

  if (validPositions.length === 0) {
    // No valid positions for this functional group
    return null; // Or handle as needed
  }

  // Randomly select a valid position
  const position = validPositions[Math.floor(Math.random() * validPositions.length)];
  return position;
}


  // Method to generate random side chains
  getRandomSideChains() {
  
    const sideChainsOptions = [
      { name: 'Methyl', smarts: 'C', length: 1 },
      { name: 'Ethyl', smarts: 'CC', length: 2 },
      { name: 'Propyl', smarts: 'CCC', length: 3 },
      { name: 'Fluoro', smarts: '(F)', length: 0 },
      { name: 'Chloro', smarts: '(Cl)', length: 0 },
      { name: 'Bromo', smarts: '(Br)', length: 0 }
    ];

  const numSideChains = Math.floor(Math.random() * 4);
  const chains = [];

  for (let i = 0; i < numSideChains; i++) {
    // Filter options to only those shorter or equal to parent chain
    const validOptions = sideChainsOptions.filter(sc => sc.length <= this.carbonChainLength);
    if (validOptions.length === 0) break; // No valid side chains
    const index = Math.floor(Math.random() * validOptions.length);
    chains.push(validOptions[index]);
  }

  return chains;
}


/*async getIUPACName(smiles) {
    const encodedSmiles = encodeURIComponent(smiles);
    const url = `https://nih.gov{encodedSmiles}/property/IUPACName/JSON`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.PropertyTable && data.PropertyTable.Properties) {
            return data.PropertyTable.Properties[0].IUPACName;
        } else {
            return "Name not found";
        }
    } catch (error) {
        console.error("Error fetching IUPAC name:", error);
        return null;
    }
}*/


  // Method to display the molecule's details
  getDescription() {
    return `
      Carbon Chain Length: ${this.carbonChainLength} carbons
      Functional Group: ${this.functionalGroup.name}
      Functional Group Position: ${this.functionalGroupPosition}
      Side Chains: ${this.sideChains.length > 0 ? this.sideChains.join(', ') : 'None'}
      Name: {this.getIUPACName('C(=O)O')}
    `;
  }
}

// Example usage:
const molecule = new OrganicMolecule();
console.log(molecule.getDescription());
console.log('hi')