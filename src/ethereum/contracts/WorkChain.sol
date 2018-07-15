pragma solidity ^0.4.17;

contract WorkChain {

    struct CompanyProfile {
        address id;
        string name;
    }
    
    struct WorkExperience {
        address employee;
        address employer;
        string title;
        string description;
        string startDate;
        string endDate;
    }

    struct PersonalProfile {
        string name;
    }
    
    address[] public companies;
    mapping(address => CompanyProfile) public companyProfileMap;
    
    mapping(address => PersonalProfile) public personalProfileMap;
    
    mapping(address => WorkExperience[]) public workExperienceMap;
    
    
    
    // ADDED
    
    // Keeps track of every requests made to each company
    mapping(address => WorkExperience[]) public pendingRequests;
    

    constructor() public {

    }

    function getCompanies() public view returns (address[]) {
        return companies;
    }
    
    function getCompanyProfile(address id) public view returns (address, string) {
        // TODO: Check if exists in map
        return (companyProfileMap[id].id, companyProfileMap[id].name);
    }
    
    function getEmployeeWorkExperienceCount (address employee) public view returns (uint) {
        return workExperienceMap[employee].length;
    }
    
    function getEmployeeWorkExperienceByIndex(address employee, uint index) public view returns(address, string, string, string, string) {
        WorkExperience memory req = workExperienceMap[employee][index];
        return (req.employer, req.title, req.description, req.startDate, req.endDate);
    }
    
    // function getPersonalProfile(address id)  public view returns (address, string) {
    //     return (companyProfileMap[id].id, companyProfileMap[id].name);
    // }

    function createCompanyProfile(address id, string name) public {
        CompanyProfile memory newCompanyProfile = CompanyProfile({
            id: id,
            name: name
        });
        companies.push(id);
        companyProfileMap[id] = newCompanyProfile;
    }
    
    function createPersonalProfile(address id, string name) public {
        PersonalProfile memory newPersonalProfile = PersonalProfile({
            name: name
        });
        personalProfileMap[id] = newPersonalProfile;
    }
    
    function addWorkExperience(address personId, address companyId, string title, string description, string startDate, string endDate) public {
        WorkExperience memory experience = WorkExperience({
            employee: personId,
            employer: companyId,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate
        });
        
        pendingRequests[companyId].push(experience);
    }
    
    
    function getCompanyPendingRequestCount(address companyId) public view returns(uint) {
        return pendingRequests[companyId].length;
    }
    
    function getCompanyPendingRequestByIndex(address companyId, uint index) public view returns (address, address, string, string, string, string) {
        WorkExperience[] memory _pendingRequests = pendingRequests[companyId];
        WorkExperience memory req = _pendingRequests[index];
        return (req.employee, req.employer, req.title, req.description, req.startDate, req.endDate);
    }
    
    function verify(address companyId, uint requestIndex) public {
        require(msg.sender == companyId);
        
        WorkExperience memory req = pendingRequests[companyId][requestIndex];
        
        // Adds request to person's work history
        workExperienceMap[req.employee].push(req);
    }
}