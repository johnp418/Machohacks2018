pragma solidity ^0.4.17;

contract WorkChain {

    struct CompanyProfile {
        address id;
        string name;
    }
    
    struct WorkExperience {
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
    mapping(address => CompanyProfile) companyProfileMap;
    
    mapping(address => PersonalProfile) personalProfileMap;
    
    mapping(address => WorkExperience[]) workExperienceMap;

    constructor() public {

    }

    function getCompanies() public view returns (address[]) {
        return companies;
    }
    
    function getCompanyProfile(address id) public view returns (address, string) {
        return (companyProfileMap[id].id, companyProfileMap[id].name);
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
            employer: companyId,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate
        });
        
        // TODO: Validate
        workExperienceMap[personId].push(experience);
    }
}