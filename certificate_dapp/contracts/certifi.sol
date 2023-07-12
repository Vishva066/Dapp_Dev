//SPDX - License -Idntifier: MIT

pragma solidity 0.8.17;

contract certi{
    struct certificate{
        string courseName;
        string candidateName;
        string grade;
        string date;
    }

    mapping(string => certificate) public certificates;

    address admin;

    constructor () {
        admin = msg.sender;
    }

    modifier isAdmin(){
        require(msg.sender == admin,"Only admin in allowed to make changes");
        _;
    }

    function issueCertificate(string memory certificateID, string memory _courseName, string memory _candidateName, string memory _grade,string memory _date) public {
        require(msg.sender == admin,"Only admin in allowed to make changes");
        certificates[certificateID] = certificate(_courseName,_candidateName,_grade,_date);
    } 

}



