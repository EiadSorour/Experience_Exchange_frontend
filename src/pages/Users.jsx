import React from "react";

const fakeUsers = [
        {
        userID: "587d42dc-ae1e-413a-8e9f-9732e98540c4",
        username: "Ayn Luis",
        password: "$2a$04$oQYIEMMZXkOWSck4o5BA1uFF0RxKGosm9eM7JvcP82zlCQh5G0VvO",
        profession: "Software Test Engineer I",
        role: "admin"
        },
        {
        userID: "eb6ca196-2160-40a0-8e09-439ed6ea8252",
        username: "Mariellen Ferrarin",
        password: "$2a$04$JJwWaZOkBGeaqiR54JXeWObCJ7V2B/CnFDrj/uqcDR5X.QuxIVDmG",
        profession: "Office Assistant II",
        role: "client"
        },
        {
        userID: "2d7ec63b-bf96-4562-8d63-b241a2cf900b",
        username: "Prent Hubbard",
        password: "$2a$04$VfiuYsBKQxcbQ0NlwN9PN.lHnWOON.2pv2qbnB1QWE0kPAX4OsmBy",
        profession: "Financial Analyst",
        role: "admin"
        },
        {
        userID: "0d8a6a2e-1579-4efd-aae7-f1ed44d59c56",
        username: "Helyn McGaugie",
        password: "$2a$04$71FemvzCEjupjYdhI5XIlOOy8pJf5fPgb7SLnU5Lz.z5QgNEmsNBO",
        profession: "Budget/Accounting Analyst I",
        role: "admin"
        },
        {
        userID: "eb92aace-b458-43b6-ab0f-d4d91b07453c",
        username: "Adi Onyon",
        password: "$2a$04$VC8o7IOuxbL7GGIm/IksIOactYT2JBe9UhH3GLY2GPmUPdRwVgQiu",
        profession: "Assistant Manager",
        role: "admin"
        },
        {
        userID: "405fd35f-551d-4984-ae48-a8d0e21b8a1a",
        username: "Emile Van der Kruijs",
        password: "$2a$04$LJg1gh1mIcyUGGzBsSNB1.bhfbi0gPIypd4YiqMTUySFZ9pKYg2ai",
        profession: "Media Manager III",
        role: "client"
        },
        {
        userID: "aec53ae1-b0b4-4741-91a1-340f15ab07c8",
        username: "Evelyn Skatcher",
        password: "$2a$04$pC8vbCt/Vx7k6XfIldZZm.RZgu0pQHgUaUo0Ge/QlCePrdY2Gnt9i",
        profession: "Dental Hygienist",
        role: "admin"
        },
        {
        userID: "2f319838-0be7-4aeb-a1ce-33d5d7182bb2",
        username: "Percy Hofner",
        password: "$2a$04$dw.xzCxjNUGtex1itWOIXON2IOMasPGwtVjF2gjIQTPREVLuqGIBC",
        profession: "Community Outreach Specialist",
        role: "admin"
        },
        {
        userID: "95022b44-38ba-41e6-9304-61419252595e",
        username: "Cynthy Truett",
        password: "$2a$04$ClENpvH4CpvywaXYbXQyQ.PQQto3cwoPu5oUELVFOKu0snPO/5I8G",
        profession: "Computer Systems Analyst III",
        role: "client"
        },
        {
        userID: "d9d9da22-5159-41ce-a4cc-a7975d949fa6",
        username: "Bobbie Jowers",
        password: "$2a$04$.5.uVGUF0ctIxUQsZs/DVe0sJX6zXSYNOL5D9m8Xk3DhgzU9.9J.u",
        profession: "Software Test Engineer I",
        role: "client"
        },
        {
        userID: "3512f4b6-a485-4de5-bc46-d7db7b8d9f6e",
        username: "Garvy Showte",
        password: "$2a$04$5kW.vP1fevKj8NrUO5vOVO6omQ/xiROfBD1I3nEGL0jl82Zmpw/HK",
        profession: "Design Engineer",
        role: "client"
        },
        {
        userID: "f0e8f481-156a-4cd0-9feb-b0fe16f72e31",
        username: "Seward Tilburn",
        password: "$2a$04$KFVXO3coG9GMW/kZP0KcwOJ8kJvJo9bJB5wisKHKQp87pTiQbiOq2",
        profession: "Dental Hygienist",
        role: "client"
        },
        {
        userID: "3e9c3250-7a30-420a-9309-bfbe422a2a7c",
        username: "Zorine Dyzart",
        password: "$2a$04$c/zw3n7pEFeFReQ9LNmi8.Mj0W7UBNatOxGXU/cOfpiBtsMedqw9e",
        profession: "Senior Cost Accountant",
        role: "client"
        },
        {
        userID: "c7b257e8-dc99-4bb6-9f04-4763663c8f9c",
        username: "Robbie Gwyn",
        password: "$2a$04$nB.aMhVKDqVgbwH4Xie18eS2cEXirizOt/gZsbGNZ04YkC.mt/5La",
        profession: "Marketing Assistant",
        role: "admin"
        },
        {
        userID: "6891706b-305d-4d60-8f7d-2d80d91fe726",
        username: "Robbie McErlaine",
        password: "$2a$04$sCJVT1DV0y0wDC7ori0KsOWGPbf6IyrbFby7VJnkpAPPicaGYaXsS",
        profession: "Health Coach III",
        role: "client"
        },
        {
        userID: "f8068e57-0bda-4cf8-96ce-2b99e9bc2fc0",
        username: "Rasla Heindle",
        password: "$2a$04$sOj1iJASztWB5dH.TOWcieWVCwe6q.qXlXn04/id/E5DN4VV1bAUm",
        profession: "Tax Accountant",
        role: "admin"
        },
        {
        userID: "87bb286a-bbb7-43de-a282-59cefc961fc1",
        username: "Melicent Collumbell",
        password: "$2a$04$T38XLS1EXmGnuSH5DdJ.N.yZL8aDbO7PpoFK9/z2LH5U45kGZVNUO",
        profession: "GIS Technical Architect",
        role: "client"
        },
        {
        userID: "82d9d807-b341-49af-bf26-6a789ecc8df2",
        username: "Nichole Faunt",
        password: "$2a$04$Vg6CHW1sxJApKCJK5TS7wONZJE2svftW/FdJmxQLZ4CRQenHxv.ty",
        profession: "Software Consultant",
        role: "admin"
        },
        {
        userID: "aaaaa426-2498-410a-9e7b-cdb93ede0824",
        username: "Gerrie Dalliwater",
        password: "$2a$04$DCm.6EfNMs8qoapewfD.B.yH.en1sO/W4V6antHKVhO.r6ue4XrSy",
        profession: "Account Coordinator",
        role: "admin"
        },
        {
        userID: "6f524516-d6b9-4901-a292-2070ef88affc",
        username: "Audrye Stainton",
        password: "$2a$04$Ilh5brT13v1RyZcwK3Ra/u34a/VM8W4jAsYvK4UYMr5U.UYC2rqa6",
        profession: "Internal Auditor",
        role: "client"
        },
        {
        userID: "a857182d-9d3a-4e54-97f5-b6999e6e02a2",
        username: "Sherrie Claydon",
        password: "$2a$04$mXFsTEAAhc3.OE38ckJx5ufE8u8q6sWnbTzoZ9VHKMsVpGmIy2ii.",
        profession: "Database Administrator II",
        role: "client"
        },
        {
        userID: "7b055097-6366-41a4-acdf-494576517bb7",
        username: "Raddie Ivanchikov",
        password: "$2a$04$euvLYdmFWWvzVSGadiG57um4xT.6nzoDz4Cmez7rp02F5dQ.w1ghK",
        profession: "Web Developer III",
        role: "admin"
        },
        {
        userID: "c49fd563-3c40-4935-8781-72ec08a835db",
        username: "Tadeas Gerretsen",
        password: "$2a$04$z04iLKSf0MCUug19So4rvuPLwWOhe.AIgc0DRu/ODa0fcsxWnt26m",
        profession: "Senior Sales Associate",
        role: "admin"
        },
        {
        userID: "c8bf2e05-8f0b-4a00-8bfc-7b1babd72818",
        username: "Franklin de'-Ancy Willis",
        password: "$2a$04$ko12fpHG3qc6ZBjBQxTAi.QXkf3kF.PGeYZg1PMBoMs.Z5LxXQ0fy",
        profession: "Pharmacist",
        role: "client"
        },
        {
        userID: "a276abc2-066e-44cb-8e49-df2daca38227",
        username: "Sorcha Winslett",
        password: "$2a$04$EOgQYpJlIrON4pa/3p.8du1qSlShvwdDrgECLGIvIPjmvFWSiXF2u",
        profession: "Data Coordinator",
        role: "admin"
        },
        {
        userID: "16577fe1-c00f-44aa-b0e4-7a3b61b3678f",
        username: "Britteny Rudge",
        password: "$2a$04$dUxl1CNAjLaq7W2mC9PtWOf6b4ZDJzUO/07rW5lG9xtmLIznwfPsG",
        profession: "Accounting Assistant IV",
        role: "admin"
        },
        {
        userID: "21c5267c-b367-433f-8c4c-edd1fa884a09",
        username: "Trudi Bowra",
        password: "$2a$04$4mMe5roaNoPqhMGdEau/g.l63sguh9yLJXCo/Hvp2NGJ4sEOP.8GG",
        profession: "Product Engineer",
        role: "client"
        },
        {
        userID: "f1404141-0494-4dcd-8993-1b9991c391ef",
        username: "Lucien Strut",
        password: "$2a$04$jQeDnA6E9FmuA79e9g8yn.XurERCUl7VDCRgQE8jSvfAiAfaJot1G",
        profession: "Senior Editor",
        role: "admin"
        },
        {
        userID: "b0f5516e-64a2-4dff-949e-ba21d2d281af",
        username: "Rosalinde Du Fray",
        password: "$2a$04$4PgtnsIAP3LgfeN5Ni2pTuj2h7XjJ4nYu.JMjrauiqcW7H8H.ALme",
        profession: "Sales Associate",
        role: "client"
        },
        {
        userID: "a0f3b294-1de2-4824-85d4-96d61e53f1db",
        username: "Frederico De Gogay",
        password: "$2a$04$cB90bBkfwo/vRIQMdw5R6Opf125e2saNsfRbz5JSlJ9QddxFCWrWa",
        profession: "Senior Cost Accountant",
        role: "client"
        },
        {
        userID: "001de83a-71e5-4386-8402-8b4b2c538557",
        username: "Dacy Bessey",
        password: "$2a$04$dsYn4xPnaof0sfHgqX9MuehH36EmU1yHOeGhhGd/NLs4dTvsfJGDG",
        profession: "Executive Secretary",
        role: "client"
        },
        {
        userID: "936c821a-4aa2-4f63-b26b-6c69be3a9b4b",
        username: "Jody Sinkin",
        password: "$2a$04$mmD3JZqtNh2jzNiD3R020Oei95fGWL3694cELp9zWJRnt1yn2Hf5i",
        profession: "Tax Accountant",
        role: "admin"
        },
        {
        userID: "add82eee-de04-4e03-808e-c5f71e90c573",
        username: "Pammie Strelitz",
        password: "$2a$04$/ZM98E7dQw52kPwuyXnyPO1MHsiLgW/aT/JAYl1OeiZrBJwt7WoA6",
        profession: "Account Coordinator",
        role: "admin"
        },
        {
        userID: "b6facad1-ecec-440f-a54d-5af527888e2d",
        username: "Christa Haime",
        password: "$2a$04$uDjUgjHUqHUJQ66qv0fpieYMaMUWAci8CXM8wG0IclJd4KiV2i4l2",
        profession: "Payment Adjustment Coordinator",
        role: "admin"
        },
        {
        userID: "14506ead-2804-48ae-b3f4-e6c4892142e5",
        username: "Quincy Treweke",
        password: "$2a$04$FhSCnjzjSa9TWi0kD4tAguP07ueh4.OtMQmHnS.ht0D0oEJqzGgc2",
        profession: "Data Coordinator",
        role: "admin"
        },
        {
        userID: "92bdf1de-5f98-440c-af53-e6bdcf7780c0",
        username: "Madella Jurasek",
        password: "$2a$04$I3Ta9rA.gjvCZhfjAYWRN.RBVIuL9bYCwMoBIZ1zvRPsWhvt5Yd5y",
        profession: "Senior Cost Accountant",
        role: "client"
        },
        {
        userID: "7d10f23f-7eb1-473a-89f4-8a4b4edaca13",
        username: "Johannah Greschke",
        password: "$2a$04$iwLZUfVg6lUOoriaaKmhpeCac1JYPl78OE8qwk4zeTELoqC8atGuK",
        profession: "Programmer Analyst IV",
        role: "client"
        },
        {
        userID: "14d0af71-14c1-4ff3-8a42-a9f6b99877be",
        username: "Devlin Lumb",
        password: "$2a$04$E/bxPyhIBQAs6L7USIlnHOVhEdTEGdTRODZGCpGeic.c9ftN/Q3q2",
        profession: "Structural Engineer",
        role: "client"
        },
        {
        userID: "4dcccb0b-1916-49d8-beb6-53d97062be89",
        username: "Xylia Betonia",
        password: "$2a$04$WtPle5XSWdVFyOrVybxhp.C91zu59I8aISbYjH/GDymATnzpY2hqy",
        profession: "Civil Engineer",
        role: "admin"
        },
        {
        userID: "ed1da904-086a-42b1-bb5c-bd2593327c5a",
        username: "Denver Kitney",
        password: "$2a$04$hPQCQd1zi0p/bI3CpFYlgupVOEPW9mFrnk75MDx6x5AJOkzBMk2xm",
        profession: "Computer Systems Analyst IV",
        role: "client"
        },
        {
        userID: "28952fce-0d2c-4d94-a37b-3fbe5d62bfd1",
        username: "Merci Antonacci",
        password: "$2a$04$LVlxd.55H1giM/h2oHaCJeRj0byEds.azDKNx.r/26vbCaG/PpvXy",
        profession: "Mechanical Systems Engineer",
        role: "client"
        },
        {
        userID: "b4259bed-b368-4e47-8754-495b3e90122e",
        username: "Saraann Fernie",
        password: "$2a$04$hTSz6Rt0k03kcckwMG6fw.bkLbxtPUlCx4dUtY6rFcnvmedlSknuq",
        profession: "Account Representative IV",
        role: "admin"
        },
        {
        userID: "5c719e95-525b-4f68-8d78-f469ea0a3c02",
        username: "Jewelle Dolohunty",
        password: "$2a$04$1Do8WOj00uq1/cToRit7PeMr99xapkn9bpxcZBVNWx5yimwO9QOjW",
        profession: "Nurse",
        role: "admin"
        },
        {
        userID: "d67c01bc-8053-469c-ae39-28a7c582fd93",
        username: "Chloe Rosnau",
        password: "$2a$04$VQwRyZem7cRmR7DazpI5JuQpWkzBN4fsAwTkTk388rqJCLdjzYvYW",
        profession: "Quality Engineer",
        role: "client"
        },
        {
        userID: "add17a21-569e-4b6e-8075-2139a1bf3e68",
        username: "Dorri Demsey",
        password: "$2a$04$Flw6vJmdynurmU4zN22MFuCHFibGI4JscufWnTGcT3R.0NNUjRxFS",
        profession: "Senior Quality Engineer",
        role: "client"
        },
        {
        userID: "01b90988-94c5-4ae3-a3f9-2473237fc072",
        username: "Worthy Thaine",
        password: "$2a$04$fPD3cr30tOC3DS7YneRmSOo.eBJzh2YvCDRbjzw9mCJJLE1ucUcym",
        profession: "Quality Engineer",
        role: "admin"
        },
        {
        userID: "00911032-464d-4457-b4c9-a3670462a6e7",
        username: "Mozelle Dominick",
        password: "$2a$04$11N4l6rigyE55.7CK2jSUexyTbB6u5IwoNveiOdW50uLyEK9JGP2K",
        profession: "Registered Nurse",
        role: "admin"
        },
        {
        userID: "fdc65c0f-32a2-407c-88ae-0034df879aef",
        username: "Dewie Renton",
        password: "$2a$04$nYCm1eD0IEGYTZLCRDVGUe7QRk6jksWjlGj7at.Z07DGS3PNLuuB6",
        profession: "Chemical Engineer",
        role: "client"
        },
        {
        userID: "51c84039-ebf1-480d-bf7a-3519a685831a",
        username: "Dar Bruinemann",
        password: "$2a$04$akv3zEd0dJ/Prri944oNBeh.vYB92vg.SiiNKq5Rb2sjGI77ZF2ZW",
        profession: "Compensation Analyst",
        role: "admin"
        },
        {
        userID: "b89e8a4d-281a-4302-b863-93224139700b",
        username: "Bren Biddulph",
        password: "$2a$04$jJPGEaxRyvXwiIp5sE2RXuak1Ew9/SKFfOzzZUkcjeJ.RLW6M770S",
        profession: "Senior Sales Associate",
        role: "client"
        },
        {
        userID: "75a6a3f7-9cf6-475a-8f65-3f23be5b61e9",
        username: "Corty Nussii",
        password: "$2a$04$sDkx5kWy9RiG3FV89mJIYOEiwCU9OwOmTbr7zHaRkDSh9WWvwUFAm",
        profession: "Data Coordinator",
        role: "client"
        },
        {
        userID: "ab1de393-f9d7-48de-a1c4-ddf24e9c9e02",
        username: "Brigid Stockton",
        password: "$2a$04$eNEi0N5o3YvssAviUd3XFen24WySDRXsb9DYCkwQN4UDLBHiaIWCq",
        profession: "Data Coordinator",
        role: "client"
        },
        {
        userID: "8c996f87-7243-4495-b13a-e51006b4f710",
        username: "Merilyn Idney",
        password: "$2a$04$tSsPjXgT6WxUXlDzpVQp9e468NCKU4UVHzBZbepv/8Fm1qUe9r2zC",
        profession: "Legal Assistant",
        role: "admin"
        },
        {
        userID: "7e942688-3a32-44a4-afbe-051d00d8666c",
        username: "Harmon Jentet",
        password: "$2a$04$iwV5bSf.O7Gj9zWk/flY7OzQDup/sA/ITkyS4bAUWWSxjFX1JpGDS",
        profession: "Structural Engineer",
        role: "client"
        },
        {
        userID: "857e2dfc-1fac-428d-b865-a83a5c411038",
        username: "Izzy Beushaw",
        password: "$2a$04$BJZfHy4ddWbPEkILiktGP.5viujX7A70mcXT12BQRwkACXjha4lSe",
        profession: "Chief Design Engineer",
        role: "client"
        },
        {
        userID: "eee1c773-bbae-49af-86b5-94ee014fb579",
        username: "Garland Ranyell",
        password: "$2a$04$NUGSvyZ65mEwhrm0hHoymObyFSSenUUPam.Ad1EY6SK1mcEkW6692",
        profession: "Account Coordinator",
        role: "client"
        },
        {
        userID: "afe7657c-4fc2-49a8-8577-4d55c96d7534",
        username: "Gale Woolner",
        password: "$2a$04$oC.UW/FaPNVHH2dhl/ExiOdFNlCCxpUbRjTnY7gQkkQjO3W75QpKq",
        profession: "Senior Editor",
        role: "client"
        },
        {
        userID: "21277417-2b81-4392-8f3d-bc6dc7e2738d",
        username: "Pace Melding",
        password: "$2a$04$vQOXVir9DSkrspo6j/EQ6ec3C7k87.e0TyUOpOD6TkpuA5d3mnBA2",
        profession: "Web Designer I",
        role: "admin"
        },
        {
        userID: "2d8c8abb-d911-43bb-baa1-8a2ff6e1916a",
        username: "Emilio Mickleburgh",
        password: "$2a$04$4bZ/Kdj32kShUXw6ejTdGu7SPM1MakXd.4rNNX3y/bseslWwYksp.",
        profession: "Environmental Tech",
        role: "admin"
        },
        {
        userID: "f185bd4d-95d4-48e1-aa27-965ce2c356fe",
        username: "Midge Kopec",
        password: "$2a$04$Q5h6sXpF6FY3AppYF0ZBY.J6dD8ttA6xtyF2AWc.fsETsMDLQupeu",
        profession: "Automation Specialist III",
        role: "client"
        },
        {
        userID: "8fec0c90-a355-4894-8773-bbcdcd177f8d",
        username: "Fabe Godsell",
        password: "$2a$04$pDGt6LH.x8YGDV3wnjlsye8JFBr4vlJdKChlYalkrAT9z8Ee6wp9u",
        profession: "VP Product Management",
        role: "client"
        },
        {
        userID: "edc6a187-5726-4ed9-a28e-4d1abe7bebfd",
        username: "Sherlocke Horrigan",
        password: "$2a$04$yYPKvhxR9i0f.AgWvfQHde3hGgV.047pOFCVsFNn54wicCeY7E1cW",
        profession: "Programmer III",
        role: "admin"
        },
        {
        userID: "74491325-349c-4710-b1c2-1b8d2b0ac0bd",
        username: "Mada Janton",
        password: "$2a$04$IydiLG/qoRasvJtC/PGJfOnJXZJPdl7zMLoqginE29g1zmsEbgxVO",
        profession: "Financial Analyst",
        role: "admin"
        },
        {
        userID: "2c447a8e-dfda-4af9-aac9-29940bc0cc0c",
        username: "Francisco Darrigrand",
        password: "$2a$04$K8g6gDkSxWo4qLI8PgyaPOeOFQWxsIba.ClWYMN6.P.l2vml9z69W",
        profession: "Actuary",
        role: "admin"
        },
        {
        userID: "8baf6c99-3fad-476c-8b20-5dccdaf51715",
        username: "Barr Penketh",
        password: "$2a$04$H6BhWOb1yyVAXSG8wafa1uoLfCnMrmi1CxuYQGPGVyO0S9tKgSyo.",
        profession: "Accounting Assistant III",
        role: "admin"
        },
        {
        userID: "4c0eb33c-f1b4-424d-b72f-50696c6ba2d8",
        username: "Natty Ciccarello",
        password: "$2a$04$ZBQJ/M.2rD0HHXIaREc.yewWKpSSxw10tda2UNa8jWx3p0X8SBxHu",
        profession: "Librarian",
        role: "admin"
        },
        {
        userID: "e8d3f651-9d24-42b9-9d73-1580d7cf63ec",
        username: "Kimberlyn Andreia",
        password: "$2a$04$sCqzP8SpitSikcC.Z9G/.Or8jq1Y/041eUXYNr1V6BXWZdjUy0GjW",
        profession: "Staff Accountant I",
        role: "admin"
        },
        {
        userID: "5d90cceb-29e1-4b94-8ede-1d6bc8d27173",
        username: "Roberta Pykett",
        password: "$2a$04$vdSryTjRkACcXc.nEFRU3ey/2/twXi.o7Q550SYyAhDkYyNsiY8ja",
        profession: "Internal Auditor",
        role: "client"
        },
        {
        userID: "fb8b2548-7135-4aa2-8c6e-0f2fe9393162",
        username: "Celestyn Twiddle",
        password: "$2a$04$oXWvgG5F5MZIvbGPSL3JHOKXQ0Kkf2Aag9kzBiNTSmWoFNN4RnSvG",
        profession: "Librarian",
        role: "client"
        },
        {
        userID: "2e7fc8bd-b4a8-4b39-9ea0-89e8cf321003",
        username: "Joy Clampton",
        password: "$2a$04$/5IVpE7EH8q6dkju8muteuN9Qu9JUW.2lr9sixvtbea6cAeBW2Dzq",
        profession: "Staff Scientist",
        role: "client"
        },
        {
        userID: "5b4a2613-0c7d-43ee-9b4f-3d0a4272251b",
        username: "Orsola Ivanishin",
        password: "$2a$04$gvAuiw1NRBp0zDa77wuVOOSQzPrL176eD/4lRfMZ.lWJSY3f5nm6q",
        profession: "Professor",
        role: "admin"
        },
        {
        userID: "575cc7dc-f368-46e4-b6a6-13e0acd090dd",
        username: "Emera Gasken",
        password: "$2a$04$UCAOWzYOLF88YYzycy4wweEvL/Ug2XD68UOCb7kiftI4VmuZqcC7a",
        profession: "VP Marketing",
        role: "client"
        },
        {
        userID: "dde30c0a-3963-48e1-9a9d-078bfe78969f",
        username: "Valentin Chasemoore",
        password: "$2a$04$kvOuIVm/LWyYpm/IDTEbr.SLkTcC2X7/xJ9bZgDIT676aaWvj0E6e",
        profession: "Sales Associate",
        role: "admin"
        },
        {
        userID: "d693f300-b420-4e38-bd4c-234fa3ca13f8",
        username: "Ollie Youhill",
        password: "$2a$04$ykbNaoN1i8CA.NeFBZwf5.3lKm4QgKJj55zOadqW3XE89Ck4n3UqC",
        profession: "Assistant Media Planner",
        role: "admin"
        },
        {
        userID: "7746bec9-d8a5-44b2-a497-266eea9b763a",
        username: "Hanna Spurgin",
        password: "$2a$04$SZRARCsiFdkTftnlX0AgsuX4P958Vq3Cc6xquPctvJAhOp/UdCNiC",
        profession: "Nurse",
        role: "client"
        },
        {
        userID: "ab405d02-a63b-43d3-84c2-3aec36f3acb5",
        username: "Ingaborg Feighry",
        password: "$2a$04$j1BWlMJim1vz7fAj705LmOsvVtX2QELvbfsAXNODmhgx7hoaZFlvy",
        profession: "Occupational Therapist",
        role: "admin"
        },
        {
        userID: "c3003288-92a9-44d5-8ea6-847830cce645",
        username: "Darill Abrahamson",
        password: "$2a$04$MoFbAmKak8eXpRyuZH0rxuOH3CluDIjTlrsBUPgiB1AjYdZzgfORm",
        profession: "Registered Nurse",
        role: "client"
        },
        {
        userID: "dcd29762-a6e5-4c1c-abe8-086fb1e1a13b",
        username: "Dorie Pafford",
        password: "$2a$04$L0.cVF7NaXTq0DAnaHbg0ehMVs7M9/5z2ufZjHB5IMIrVpouTK2a.",
        profession: "Help Desk Operator",
        role: "client"
        },
        {
        userID: "8bc2d494-0177-4fb5-86e1-cc7ccab0f7da",
        username: "Justino Werrilow",
        password: "$2a$04$Ay6fP2WpZPVV3KdBDhwDuOuVITMx.xyLPXA1s7kAwJ5y52Q6TfAmS",
        profession: "Account Executive",
        role: "admin"
        },
        {
        userID: "10e4a1fe-6013-423e-97f1-e23213c84da8",
        username: "Sofie Hutchence",
        password: "$2a$04$UKUEIvBe9af05AYZyD6S1uPAKhJhdTLHMbwRw085Mugep6yuVmWBa",
        profession: "Executive Secretary",
        role: "client"
        },
        {
        userID: "fd144626-5851-48e8-b3da-fd6cb794a7e5",
        username: "Porter Gronow",
        password: "$2a$04$CaqqMpPrW8hGOPL4Zji8se3hCS74G81/U0V.Zmx9n.aVh7cvmk1OK",
        profession: "Food Chemist",
        role: "admin"
        },
        {
        userID: "49df4529-c202-4756-b115-9c02c7757c1d",
        username: "Nathan McRitchie",
        password: "$2a$04$5NQ0Mej2NCepJhw3bYvW5OP9u/jYOaPH5bzMK6OD2ghbBbgrEizQq",
        profession: "VP Quality Control",
        role: "admin"
        },
        {
        userID: "e373f365-132c-4655-a62f-b0bb2280648d",
        username: "Leone Thresher",
        password: "$2a$04$TbVut0FbbP4xr2nx9Y0LfOO1n9SqwoA0v.BgiAWvWbRQQKw3I2OJy",
        profession: "VP Accounting",
        role: "admin"
        },
        {
        userID: "ea5a1984-fd5b-4451-844e-c8ab624b8874",
        username: "Stoddard Lugard",
        password: "$2a$04$AZiOEh2wLwsYzzQZ.Td7IeS.HBLfZ114zSI8K7wCJwWDvgCvD8J5i",
        profession: "Director of Sales",
        role: "client"
        },
        {
        userID: "bff92ee1-f1da-439b-a746-d3095a49467f",
        username: "Orson Fuchs",
        password: "$2a$04$b.Y7syrt7hzF28Y/aOjgo.henLjDmoJC0xsaP/KNZKO06AuBvKzqC",
        profession: "Physical Therapy Assistant",
        role: "client"
        },
        {
        userID: "8b799f2e-9844-46d1-bba1-0d8a47322e4c",
        username: "Callie Pudding",
        password: "$2a$04$JxA5ZPEOawtGh5SasydyTeIh5VgwCG4vKBO9VlvtxFPUvhorNDO9a",
        profession: "Structural Engineer",
        role: "client"
        },
        {
        userID: "bd02c8d6-b367-4a02-ac7c-ab10af433377",
        username: "Florencia Jarmaine",
        password: "$2a$04$0s4K91WJpaQ8km2FKkSzVujL17kUoGAQkLzFAEW/D6QmrUd4tpzjO",
        profession: "VP Marketing",
        role: "admin"
        },
        {
        userID: "f2a2bd38-2ab9-4e2c-b3d0-17bc509ed489",
        username: "Eleanora Bromont",
        password: "$2a$04$mCrmoOaO9/EaWQZeLcUSFuK7q7TagJtv611n.mXXu1ABr07a3Dlty",
        profession: "VP Product Management",
        role: "admin"
        },
        {
        userID: "1a1d891d-48c4-43e1-a50a-a057ab484dae",
        username: "Rainer Vasilenko",
        password: "$2a$04$AKCLMebwDEmEFBJ7fHBT5eaL7KlhZlFXfCmSXNXXqI3TQDQAAUtPa",
        profession: "Cost Accountant",
        role: "client"
        },
        {
        userID: "c1ba236f-fc3d-406c-9fd3-5efa100cc2e6",
        username: "Elayne Hasluck",
        password: "$2a$04$Jr.TctWMbXcSsQa9qo1.ieG/6jCtFu5EHSQlbmWI5fgI3qqx9XOGG",
        profession: "Engineer II",
        role: "client"
        },
        {
        userID: "189fd60f-0eb7-40e4-8a6e-6e3d9e52f5f4",
        username: "Keelia Karolyi",
        password: "$2a$04$gtczf5bUJuQ0T1BplvRohO2uRbAsnq5b5adSAeNbTt7zm6pb.Ty3q",
        profession: "Programmer II",
        role: "client"
        },
        {
        userID: "2947183a-5eb7-4f22-bb92-56a59f5c5531",
        username: "Helsa Gorelli",
        password: "$2a$04$u0sYR.kiGhJXX0vEUUz.i.r/NBNtBdzNWgq2lqg5eWGe38ob.vanS",
        profession: "Financial Advisor",
        role: "admin"
        },
        {
        userID: "8ca25345-3ce2-4fdb-b48b-821ff942b923",
        username: "Hasheem Shambrook",
        password: "$2a$04$rmlE7WYa4wT6ogCOMfvuve8rx0NpP1EiwD34YGw5FpXZ5ACRsvVsa",
        profession: "Librarian",
        role: "admin"
        },
        {
        userID: "ba47022c-02f0-4a96-9768-36a33d1be40d",
        username: "Val Putterill",
        password: "$2a$04$zGMC.3HRi6IQmMRXhP0PyuN21lxNFnVUI0IzbwrBawjjH7XskhOSS",
        profession: "Nuclear Power Engineer",
        role: "admin"
        },
        {
        userID: "2d25fe94-e727-4617-be41-9a9a493e98d4",
        username: "Charissa Sams",
        password: "$2a$04$TUipeGTGS1rRePFvVEifluavgUg.KaMEv7NQwEBoUCTa.O5Ab2f8e",
        profession: "Marketing Assistant",
        role: "admin"
        },
        {
        userID: "bb378cdc-777e-4115-96ad-0e1bd4b7cac0",
        username: "Issy Ivchenko",
        password: "$2a$04$uiEIvYe/RAb6LrsVDPJyq.oV8voiQM.MNmwbmd3LDJsZjctNtAbKS",
        profession: "Budget/Accounting Analyst I",
        role: "client"
        },
        {
        userID: "8b854d8d-6203-4498-b3e6-38a6df1d7625",
        username: "Silva Beddin",
        password: "$2a$04$rDAi8dgcdv6rfCwPYH0l7uHTni78ZWtvkbAXLsEeD1wtC95I7CLPC",
        profession: "Financial Advisor",
        role: "client"
        },
        {
        userID: "4b57b81f-238f-4ee0-97fb-93797adf7163",
        username: "Rod Belton",
        password: "$2a$04$KaTXWsRjGZd8qcucYJkvIuVllqPsj/ii0gDcIBUUyKfGhf1I18Nae",
        profession: "Paralegal",
        role: "admin"
        },
        {
        userID: "43469959-e061-4714-ac00-6e58a6b8188b",
        username: "Gusti Dybbe",
        password: "$2a$04$A9ShkqXOUSxEqrjwmA5hqOAYgevNN.0L963wGGoiLtUHefh25bubG",
        profession: "Programmer II",
        role: "admin"
        },
        {
        userID: "733301d2-8d41-42d9-b4d9-734adae9ee02",
        username: "Maryjo Berkely",
        password: "$2a$04$29hdInUihztpl.rZAbm8qujI7fOZgcxaSkJ.7iAbxQDMQ6xxxu0q.",
        profession: "Actuary",
        role: "client"
        }
    ]

function UsersPage() {

    function paginationDemo(limit , offset){
        var users = [];
        for(var i = (limit*offset) ; i < (limit*(offset+1)); i++){
            users.push(fakeUsers[i]);
        }
        return users;
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
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-success">unblock</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-danger">Block</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-danger">Remove Admin</button></td>
                </tr>
                <tr>
                    <td>45421831</td>
                    <td>eiad tarek</td>
                    <td>ai engineer</td>
                    <td>admin</td>
                    <td><button className="btn btn-success">unblock</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    <td><button className="btn btn-success">Make Admin</button></td>
                </tr>
            </tbody>
        </table>

        <div className="position-relative">
            <nav aria-label="Page navigation example" className="position-absolute mt-3 top-50 start-50 translate-middle">
                <ul className="pagination">
                    <li class="page-item"><a class="page-link text-bg-primary" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                </ul>
            </nav>
        </div>
        
        <button className="btn btn-primary position-absolute top-100 start-0 mt-5">Back</button>
    </div>
    );
}

export default UsersPage;
