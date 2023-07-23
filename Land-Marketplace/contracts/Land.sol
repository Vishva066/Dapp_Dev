// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LandRegistration is ERC721 {
    constructor() ERC721("Land", "LND") {}

    struct LandDetail {
        uint256 surveyNo;
        string district;
        string taluk;
        string village;
        uint256 blockNo;
        uint256 landValue; // in wei
        uint256 area;
        bool salesStatus;
    }

    mapping(uint256 => LandDetail) LandDetails;

    uint256 public registeredLandCount = 0;

    function registerNewLand(
        uint256 surveyNo,
        string memory district,
        string memory taluk,
        string memory village,
        uint256 blockNo,
        uint256 landValue,
        uint256 area
    ) public {
        LandDetails[registeredLandCount] = LandDetail(
            surveyNo,
            district,
            taluk,
            village,
            blockNo,
            landValue,
            area,
            false
        );
        _mint(msg.sender, registeredLandCount);
        registeredLandCount += 1;
    }

    function getLandDetails(uint256 landID)
        public
        view
        returns (LandDetail memory)
    {
        return LandDetails[landID];
    }
}
