export default class TestDataGenerator {

    generateRandomFullName() {

        const firstNames = [

            "John", "Emma", "Michael",

            "Sophia", "David", "Olivia"

        ];


        const lastNames = [

            "Smith", "Johnson", "Brown",

            "Williams", "Miller", "Davis"

        ];


        const firstName =

            firstNames[Math.floor(Math.random() * firstNames.length)];


        const lastName =

            lastNames[Math.floor(Math.random() * lastNames.length)];


        return `${firstName} ${lastName}`;

    }


    generateCountry() {

        const countries = [

            "India", "USA", "UK",

            "Germany", "Australia", "Singapore"

        ];


        return countries[

            Math.floor(Math.random() * countries.length)

        ];

    }


    generateCityName() {

        const cities = ["City", "Metro", "Urban", "Town"];


        return `${cities[Math.floor(Math.random() * cities.length)]}_${Date.now()}`;

    }


    generateFormattedCardNumber() {

        let cardNumber = "";


        for (let i = 0; i < 16; i++) {

            cardNumber += Math.floor(Math.random() * 10);


            if ((i + 1) % 4 === 0 && i !== 15) {

                cardNumber += " ";

            }

        }


        return cardNumber;

    }


    generateRandomMonth() {

        const months = [

            "January", "February", "March", "April",

            "May", "June", "July", "August",

            "September", "October", "November", "December"

        ];


        return months[Math.floor(Math.random() * months.length)];

    }


    generateRandomYear() {

        const startYear = 2026;

        const endYear = 2050;


        return String(Math.floor(

            Math.random() * (endYear - startYear + 1)

        ) + startYear);

    }


    generateUsername() {

        const names = [

            "alex", "sam", "john", "emma", "liam",

            "mia", "noah", "olivia", "lucas", "ava"

        ];


        const randomName =

            names[Math.floor(Math.random() * names.length)];


        const randomNumber = Math.floor(Math.random() * 10000);


        return `${randomName}${randomNumber}`;

    }


    generatePassword(length = 10) {

        const chars =

            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";


        let password = "";


        for (let i = 0; i < length; i++) {

            password += chars.charAt(

                Math.floor(Math.random() * chars.length)

            );

        }


        return password;

    }


    generateRandomMonthMM() {

    const month = Math.floor(Math.random() * 12) + 1;

    return month.toString().padStart(2, "0");

}



}