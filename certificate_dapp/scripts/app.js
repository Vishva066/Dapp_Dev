connectToMetaMask = async () => {
    let accounts = await ethereum.request({method: "eth_requestAccounts"})
    console.log(accounts)
    alert("Connected to " + accounts[0]);
}

window.onload = async() => {
    const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "certificates",
          "outputs": [
            {
              "internalType": "string",
              "name": "courseName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "candidateName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "grade",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "date",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "certificateID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_courseName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_candidateName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_grade",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_date",
              "type": "string"
            }
          ],
          "name": "issueCertificate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const ContractAddress = "0xf335693F4e83f39Ba5f18AD527438913b2b0da69"

      web3 = new Web3(ethereum)
      MyContract = new web3.eth.Contract(abi, ContractAddress)
}

issueCertificate = async () => {
    let certificateID = document.getElementById("certificateID").value
    let candidateName = document.getElementById("candidateName").value
    let courseName = document.getElementById("courseName").value
    let grade = document.getElementById("grade").value
    let date = document.getElementById("date").value

    let trxReceipt = await MyContract.methods.issueCertificate(certificateID, courseName , candidateName, grade, date).send({ from: ethereum.selectedAddress})
    console.log(trxReceipt)   
}

queryCertificate = async () => {
    let certificateID = document.getElementById("certificateID").value
    let result = await MyContract.methods.certificates(certificateID).call()
    console.log(result)
    localStorage.setItem("certificateID", certificateID)
    localStorage.setItem("candidateName", result.candidateName)
    localStorage.setItem("courseName", result.courseName)
    localStorage.setItem("grade", result.grade)
    localStorage.setItem("date", result.date)
    const url = "viewCertificate.html"
    window.location.href = url
}

