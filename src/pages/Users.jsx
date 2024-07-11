import React from "react";

const fakeUsers = [
        {
        userID: "2b1f3873-27f1-4486-a793-cec270c48460",
        username: "Ginevra Beharrell",
        profession: "Paralegal",
        role: "client",
        isBlocked: true
        },
        {
        userID: "799dc732-5606-4d8a-9f91-fd09c4ff7a71",
        username: "Rhea Glowinski",
        profession: "VP Quality Control",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "70b5fa5f-ec6d-45bc-a389-d952bdd93b4f",
        username: "Eloisa Cullrford",
        profession: "Human Resources Assistant III",
        role: "client",
        isBlocked: false
        },
        {
        userID: "94cff0a4-6a4a-4482-a57d-f20ffcb3e382",
        username: "Mohandis Cranson",
        profession: "Civil Engineer",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "a8704997-a94f-4965-a42a-72cddc8dc16a",
        username: "Idell Kerrane",
        profession: "Legal Assistant",
        role: "client",
        isBlocked: false
        },
        {
        userID: "7f431d06-8c1e-4daa-b4ed-ccc322457867",
        username: "Rolando Rookledge",
        profession: "VP Quality Control",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "5f9f15bf-547d-47e1-a54d-6b781f5395c0",
        username: "Garland McGiffin",
        profession: "Human Resources Assistant I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "0a1db47e-30ca-4bca-8042-c1ee2bb9752a",
        username: "Allison Worsfield",
        profession: "Staff Scientist",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "3896725b-16d1-46fc-b375-c1cd4edd07ed",
        username: "Mireielle Stribbling",
        profession: "Software Test Engineer II",
        role: "client",
        isBlocked: true
        },
        {
        userID: "82953bde-51fe-488b-a482-cf7ecbc6889a",
        username: "Zach Pittaway",
        profession: "Research Assistant IV",
        role: "client",
        isBlocked: false
        },
        {
        userID: "5203db9f-9493-4eb8-b01a-6cfbc96b18d0",
        username: "Wes Biasio",
        profession: "Budget/Accounting Analyst I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "d2976f64-7bcd-461e-9729-496b12c57b93",
        username: "Esma Yvens",
        profession: "VP Product Management",
        role: "client",
        isBlocked: true
        },
        {
        userID: "14b4d136-12d0-445b-ab4d-a8050f9d4fd5",
        username: "Wenona Kowal",
        profession: "Pharmacist",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "3d20cc2a-641f-4c95-96de-fff68c1d5666",
        username: "Piggy Slowgrave",
        profession: "Food Chemist",
        role: "client",
        isBlocked: false
        },
        {
        userID: "fe7ddf71-1420-48c7-8b39-b0801f1cab54",
        username: "Neal Chastel",
        profession: "Staff Scientist",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "de8b6309-dff9-4b43-a373-bc6dd01318b7",
        username: "Reggi Camfield",
        profession: "Computer Systems Analyst II",
        role: "client",
        isBlocked: true
        },
        {
        userID: "602e7160-8f57-4727-a839-f7f9eb00526a",
        username: "Karlie Cadreman",
        profession: "Software Engineer I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "e0e8a6ab-d339-4cca-9799-f24e0978e69e",
        username: "Marita Hackworthy",
        profession: "Office Assistant II",
        role: "client",
        isBlocked: true
        },
        {
        userID: "331f3f9d-3eaa-4b2f-9a70-f472ff81e23b",
        username: "Prisca McDoual",
        profession: "Media Manager II",
        role: "client",
        isBlocked: true
        },
        {
        userID: "5bc79065-9a3b-488e-84ae-4e44751efbef",
        username: "Joeann Hiseman",
        profession: "VP Quality Control",
        role: "client",
        isBlocked: true
        },
        {
        userID: "a7bb596e-29d9-43e8-83f8-a5089a2c55b3",
        username: "Gretchen Burdas",
        profession: "Quality Control Specialist",
        role: "client",
        isBlocked: false
        },
        {
        userID: "de414e77-6422-4568-aea7-e9525f7d2339",
        username: "Auria Maginot",
        profession: "Project Manager",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "91b6046a-c6e4-4310-92ef-1b9f7f806650",
        username: "Paco Robke",
        profession: "Sales Associate",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "3b4f2e3c-9b7b-42e0-81fb-09d73db7a136",
        username: "Benjamen Flowerdew",
        profession: "Financial Analyst",
        role: "client",
        isBlocked: true
        },
        {
        userID: "90dad09c-6729-4df4-a639-0945bf3ad447",
        username: "Gunter Blunsum",
        profession: "Research Associate",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "9bde4b0b-2cf7-46b7-a92e-128c1c64a8d1",
        username: "Antone Twinborne",
        profession: "Structural Analysis Engineer",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "4aefc764-6565-427c-b5cb-f987e857d384",
        username: "Lurleen Carnson",
        profession: "VP Marketing",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "6d9aa5d3-f571-43f4-811d-601453cb5e06",
        username: "Layney Plues",
        profession: "Engineer IV",
        role: "client",
        isBlocked: true
        },
        {
        userID: "8aa1963b-513a-4e8d-b517-3594874b0514",
        username: "Kean Fronczak",
        profession: "Sales Representative",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "241bf33a-66ca-40a4-b3e2-2b0ea06677ac",
        username: "Moises Skatcher",
        profession: "Programmer III",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "98493f6f-2c1f-44ef-a262-ab34f1bab4b3",
        username: "Zabrina Sinclaire",
        profession: "Mechanical Systems Engineer",
        role: "client",
        isBlocked: true
        },
        {
        userID: "5ddbed46-5be8-46d9-a066-7c057d1b5ab2",
        username: "Celka Thynne",
        profession: "Financial Advisor",
        role: "client",
        isBlocked: false
        },
        {
        userID: "678d5350-f69e-4119-9d81-c2669a1f6b27",
        username: "Donia Vern",
        profession: "Information Systems Manager",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "45653d06-a34d-4b69-98ef-939fe7929d81",
        username: "Osbourne Duggan",
        profession: "Compensation Analyst",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "fe04633b-bef9-4db8-81fd-99e286de44dc",
        username: "Michaeline Thorald",
        profession: "Operator",
        role: "client",
        isBlocked: true
        },
        {
        userID: "d010aed9-d0fc-4be0-b8b1-a80a73adddb6",
        username: "Chaddy Rosa",
        profession: "Research Assistant IV",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "0a7631c5-2793-4cbb-b012-472aeba11958",
        username: "Marketa Osgar",
        profession: "Quality Control Specialist",
        role: "client",
        isBlocked: false
        },
        {
        userID: "b09bdfdd-0852-4557-be75-785feba096f4",
        username: "Shane Kach",
        profession: "Nuclear Power Engineer",
        role: "client",
        isBlocked: false
        },
        {
        userID: "acbafc38-f36b-44c2-aefa-ad1ab06d1942",
        username: "Harcourt Popworth",
        profession: "Accountant II",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "bcbc2b81-5da8-4f53-9d41-8fc3662a953b",
        username: "Lenci Richter",
        profession: "Information Systems Manager",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "d335cb5f-a956-42f5-a69d-e426a94bb7aa",
        username: "Vaughan Pallesen",
        profession: "Help Desk Technician",
        role: "client",
        isBlocked: false
        },
        {
        userID: "62c6e810-9fac-44d9-a4e6-231d3995da78",
        username: "Tera Rodbourne",
        profession: "Senior Cost Accountant",
        role: "client",
        isBlocked: false
        },
        {
        userID: "0a48ebbf-07c9-4ca1-9bf4-9c3590b39911",
        username: "Chicky Dogg",
        profession: "Account Executive",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "1c6f6f60-476b-46f3-a02b-cd318991917f",
        username: "Rickie Rippingall",
        profession: "Cost Accountant",
        role: "client",
        isBlocked: false
        },
        {
        userID: "76ed35ea-a65f-45e5-9911-a85ac8672a0e",
        username: "Ginelle De Leek",
        profession: "Accounting Assistant III",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "ee67c57e-8260-4faf-a169-095a4070633b",
        username: "Catie Karlolak",
        profession: "Nurse",
        role: "client",
        isBlocked: false
        },
        {
        userID: "ad3047ff-0882-48c3-bcd7-b7343a0ce343",
        username: "Reidar Verrills",
        profession: "Health Coach I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "a6f169d4-8344-4418-8d3a-6802c6567f17",
        username: "Noah Iacopo",
        profession: "VP Product Management",
        role: "client",
        isBlocked: false
        },
        {
        userID: "6e26f13e-86f0-4200-9ad3-68ede569c708",
        username: "Marieann Dunnan",
        profession: "Structural Engineer",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "b3bf4be7-da29-467b-aeca-85098020fec6",
        username: "Marcellina Rittelmeyer",
        profession: "Community Outreach Specialist",
        role: "client",
        isBlocked: false
        },
        {
        userID: "bc5c46cf-20f4-4b4d-9036-8101baaa300d",
        username: "Alexio Handrahan",
        profession: "Dental Hygienist",
        role: "client",
        isBlocked: true
        },
        {
        userID: "3be2c926-f6f8-4ed8-9c93-1c29d6e50d01",
        username: "Hayes Ellph",
        profession: "Software Test Engineer II",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "914ef82a-8d85-4396-b70c-1af218f9dc17",
        username: "Vaughan Gosden",
        profession: "Budget/Accounting Analyst IV",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "34f293c5-7324-4d5e-bf62-525000f6ce20",
        username: "Roosevelt Tree",
        profession: "Operator",
        role: "client",
        isBlocked: true
        },
        {
        userID: "24460bde-11b5-4ec8-9278-6e721acb4b5d",
        username: "Lanie Goodram",
        profession: "Sales Representative",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "db4344bc-3c11-44f8-ab2f-1e6af46815f4",
        username: "Nananne Faltskog",
        profession: "Staff Scientist",
        role: "client",
        isBlocked: true
        },
        {
        userID: "ef8b5a4c-8639-4956-9b77-8d586ca114a4",
        username: "Carlie O'Logan",
        profession: "Occupational Therapist",
        role: "client",
        isBlocked: false
        },
        {
        userID: "b152fc5c-341e-4257-a6dc-9e9745813ac4",
        username: "Hillel Swinden",
        profession: "Desktop Support Technician",
        role: "client",
        isBlocked: true
        },
        {
        userID: "57de481b-6cea-4820-87a7-c4d8685f17d2",
        username: "Regen Nickless",
        profession: "Structural Engineer",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "51c4da26-bc88-49ee-b0f9-1e39bd0dfbe7",
        username: "Anna-diana Daviddi",
        profession: "Senior Quality Engineer",
        role: "client",
        isBlocked: true
        },
        {
        userID: "3b8ee47e-5fc1-440c-b2d5-74f84416f578",
        username: "Tarah Bardwell",
        profession: "Help Desk Operator",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "4c0bc9b5-f08b-47e5-9427-5f8f1d71d998",
        username: "Dorolice Gurnett",
        profession: "Engineer II",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "ceb22f21-e9c3-439f-9d24-658009917c76",
        username: "Yasmeen Thonason",
        profession: "Senior Developer",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "bdf8eb2a-1da5-4d1b-84ac-a8e9f2d7e3eb",
        username: "Bailey Harling",
        profession: "Biostatistician IV",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "2ed2fddc-c686-4a34-b3ed-5a27a62e111d",
        username: "Jackie Abells",
        profession: "VP Quality Control",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "30f43021-8890-4275-ab3a-b674704f8409",
        username: "Hadria Yurukhin",
        profession: "Mechanical Systems Engineer",
        role: "client",
        isBlocked: false
        },
        {
        userID: "004ce609-0cc8-4d92-b038-7cf9e9592e02",
        username: "Corrinne Rykert",
        profession: "Software Engineer I",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "ee999a0e-e0cc-48c8-86b5-9e8195abf056",
        username: "Nataline Lally",
        profession: "Environmental Specialist",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "c8e4ab72-e260-45f2-bc0a-a8b0a6d0edbc",
        username: "Oswell Borham",
        profession: "Geologist I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "dd718973-000c-4ad0-83fa-98b22da52722",
        username: "Herculie Toffts",
        profession: "VP Marketing",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "5d08984f-1bc4-4cb8-bf8c-abe62dfe1d9c",
        username: "Tova Betts",
        profession: "Editor",
        role: "client",
        isBlocked: false
        },
        {
        userID: "ea98590d-8a61-4006-931e-f95cd1902645",
        username: "Nanete Litton",
        profession: "Business Systems Development Analyst",
        role: "client",
        isBlocked: true
        },
        {
        userID: "574b5bca-92d4-4723-97ad-250921fcc5a3",
        username: "Nanine Rankcom",
        profession: "Research Assistant III",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "ee8da9f3-5530-4ba3-91a9-ada5131735db",
        username: "Rip Goldsberry",
        profession: "Geologist III",
        role: "client",
        isBlocked: false
        },
        {
        userID: "80d3376e-bd20-4295-889d-441b56424fe9",
        username: "Pascal Streat",
        profession: "Data Coordinator",
        role: "client",
        isBlocked: true
        },
        {
        userID: "ae137616-de3f-4d42-8a9e-c6795d5addbe",
        username: "Rubetta Consterdine",
        profession: "Actuary",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "e7986bbe-d942-493b-aa2c-0a23b907b997",
        username: "Kaylee Billows",
        profession: "Environmental Specialist",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "3ae5b8c4-80a0-43fe-8009-295362013331",
        username: "Laurette Balhatchet",
        profession: "Senior Editor",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "71910d28-e99d-4ba9-8223-ab53d10b142d",
        username: "Mickie Fraczkiewicz",
        profession: "Web Designer IV",
        role: "client",
        isBlocked: false
        },
        {
        userID: "44026d61-14d4-43b2-a50f-96a7074e20c1",
        username: "Mala Jerok",
        profession: "Automation Specialist I",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "d969fe0f-c126-42a0-b668-7ee9b8d9c7d0",
        username: "Debi Hucklesby",
        profession: "Human Resources Manager",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "6b6003da-b53a-43d7-af94-1a1561eb2eb1",
        username: "Jacinta Norkutt",
        profession: "Internal Auditor",
        role: "client",
        isBlocked: false
        },
        {
        userID: "5f2ace2f-ad8d-4739-be26-cfd7e730c890",
        username: "Junette Varndell",
        profession: "Tax Accountant",
        role: "client",
        isBlocked: false
        },
        {
        userID: "db4397e6-3015-4af1-a177-6603aa1415ab",
        username: "Demetria Penwarden",
        profession: "Help Desk Technician",
        role: "client",
        isBlocked: true
        },
        {
        userID: "a8207bb2-0e1e-41fc-9bd7-430b83f427dc",
        username: "Lodovico Barbary",
        profession: "Executive Secretary",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "901ce744-8cbd-4797-b0d9-09c454c31a7e",
        username: "Grete Claibourn",
        profession: "Operator",
        role: "client",
        isBlocked: false
        },
        {
        userID: "d83a48d5-c65c-495e-ba82-07d5c75c2e11",
        username: "Siana Klagges",
        profession: "Pharmacist",
        role: "client",
        isBlocked: true
        },
        {
        userID: "6984039d-b097-4360-8e6d-12201e0811dc",
        username: "Trace Jancso",
        profession: "Health Coach III",
        role: "client",
        isBlocked: true
        },
        {
        userID: "7c180c94-022e-4e4a-837b-2977f3f21e16",
        username: "Kyla Seaman",
        profession: "Speech Pathologist",
        role: "client",
        isBlocked: true
        },
        {
        userID: "ca544f0b-95b3-4cfc-bf7c-da9a9bc6fb7f",
        username: "Ike Ferro",
        profession: "Librarian",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "854e18bc-be8a-4b26-98ee-8560ca60b81f",
        username: "Garik Keddle",
        profession: "Business Systems Development Analyst",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "3d6e32fc-8e71-4f8d-8caf-6f5b79bcfffa",
        username: "Ninnette Aucock",
        profession: "Senior Developer",
        role: "client",
        isBlocked: false
        },
        {
        userID: "804d5031-0cac-4011-9453-2c497938bf1b",
        username: "Larry Delany",
        profession: "Safety Technician I",
        role: "client",
        isBlocked: true
        },
        {
        userID: "cc378031-58aa-4398-ad74-91fade162e38",
        username: "Napoleon Cowell",
        profession: "Electrical Engineer",
        role: "client",
        isBlocked: false
        },
        {
        userID: "2aa19400-18c9-40a3-a3be-f5cb4018ec08",
        username: "Fernande Choulerton",
        profession: "Budget/Accounting Analyst IV",
        role: "client",
        isBlocked: false
        },
        {
        userID: "259f0371-9449-45a3-a339-ea0f4526db60",
        username: "Shoshanna Biaggi",
        profession: "Clinical Specialist",
        role: "admin",
        isBlocked: true
        },
        {
        userID: "c021d385-6cd2-448d-b80c-c9ddb49dc920",
        username: "Brigitta Wellesley",
        profession: "Actuary",
        role: "client",
        isBlocked: true
        },
        {
        userID: "18956b5d-873a-45ad-9c5e-b89d54a622e6",
        username: "Ilario Hattiff",
        profession: "Software Test Engineer I",
        role: "client",
        isBlocked: true
        },
        {
        userID: "0f311b90-bddc-4e3e-a36b-814e7580f08b",
        username: "Barrie Kenealy",
        profession: "Health Coach IV",
        role: "admin",
        isBlocked: false
        },
        {
        userID: "29032250-b22c-4c3a-950a-4c005026dbba",
        username: "Gayle Halpine",
        profession: "Environmental Specialist",
        role: "client",
        isBlocked: false
        }
    ]

function UsersPage() {

    const paginationLimit = 5;
    const usersCount = fakeUsers.length;
    const maxPageNumber = Math.ceil(usersCount/paginationLimit);

    const [users, setUsers] = React.useState([]);
    const[currentPage , setCurrentPage] = React.useState(1);

    React.useEffect(()=>{
        setUsers(paginationDemo(5,1));
    }, [])

    function paginationDemo(limit , offset){
        var users = [];
        for(var i = (limit*(offset-1)) ; i < (limit*(offset)); i++){
            users.push(fakeUsers[i]);
        }
        return users;
    }

    function handleOnNextPage(){
        if(currentPage !== maxPageNumber){
            setUsers(paginationDemo(paginationLimit , (currentPage+1)));
            setCurrentPage(currentPage+1);
        }
    }

    function handleOnPreviousePage(){
        if(currentPage !== 1){
            setUsers(paginationDemo(paginationLimit , (currentPage-1)));
            setCurrentPage(currentPage-1);
        }
    }

    return (
    <div className="text-center d-grid gap-2 col-11 mx-auto position-absolute top-50 start-50 translate-middle">
        
        <h6>Search by:</h6>
        
        <div>
            <div className="text-start form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label className="form-check-label" for="inlineRadio1">userID</label>
            </div>
            <div className="text-start form-check form-check-inline">
                <input checked className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label className="form-check-label" for="inlineRadio2">username</label>
            </div>
        </div>

        <div class="d-flex px-5 py-2 col-6 position-relative top-50 start-50 translate-middle">
            <input style={{minWidth: "120px"}} type="text" class="form-control" placeholder="Search"/>
            <button class="btn btn-primary ms-2">Search</button>
            <button class="btn btn-secondary ms-2">Reset</button>
        </div>


        <table class="table table-bordered table-striped">
            <thead className="table-secondary">
                <tr>
                    <th scope="col">userID</th>
                    <th scope="col">username</th>
                    <th scope="col">profession</th>
                    <th scope="col">role</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>{
                    return (
                        <tr>
                            <td>{user.userID}</td>
                            <td>{user.username}</td>
                            <td>{user.profession}</td>
                            <td>{user.role}</td>
                            <td><button className={user.isBlocked === false? "btn btn-danger":"btn btn-success"}>{user.isBlocked === true? "unblock": "Block"}</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                            <td><button className={user.role === "admin"? "btn btn-danger":"btn btn-success"}>{user.role === "admin"? "Remove Admin":"Make Admin"}</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <div className="position-relative">
            <nav aria-label="Page navigation example" className="position-absolute mt-3 top-50 start-50 translate-middle">
                <ul className="pagination">
                    <li onClick={handleOnPreviousePage} class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">{currentPage}</a></li>
                    <li onClick={handleOnNextPage} class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <button className="btn btn-primary position-absolute top-100 start-0 mt-5">Back</button>
    </div>
    );
}

export default UsersPage;
