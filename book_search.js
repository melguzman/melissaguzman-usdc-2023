/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    
    let searchResults = [];

    // check for invalid input
    if (searchTerm === undefined || searchTerm == "" || scannedTextObj === undefined 
        || scannedTextObj.length == 0){
        console.log("Invalid input. Search not performed.");
        return new Result(searchTerm, searchResults);
    }

    // we will only search for term in books with content
    const booksWithContent = scannedTextObj.filter(hasValidContent);

    booksWithContent.forEach(book => {
        const contentFound = findMatchedContent(book, searchTerm);
        searchResults = searchResults.concat(contentFound);
    });

    return new Result(searchTerm, searchResults); 
}

/**
 * Checks if an individual book has content
 * @param {JSON} book - A JSON object representing the scanned text of an individual book.
 * @returns {boolean} - true if a book has content or false otherwise.
 * */ 
function hasValidContent(book) {
    const content = book.Content;
    return Array.isArray(content) && content.length > 0;
  }

/**
 * Checks all the content of an individual book for the search term then converts 
 * matched content results into a MatchedContent object
 * @param {JSON} book - A JSON object representing the scanned text of an individual book.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @returns {JSON list} - A list of all content pieces from a book where the search term is included
 * */ 
function findMatchedContent(book, searchTerm) {
    const content = book.Content;
    const ISBN = book.ISBN;

    if (ISBN === undefined || ISBN == ""){
        console.log("ISBN of book " + book.Title + " is missing");
    }

    return content.filter(contentPiece => checkContentPieceForTerm(contentPiece, searchTerm))
                    .map(contentPiece => new MatchedContent(ISBN, contentPiece.Page, contentPiece.Line));
}

/**
 * Checks if a specific content piece contains the search term in the Text
 * @param {JSON} contentPiece - A JSON object representing an individual content piece that 
 * may contain page, line, text information.
 * @param {string} searchTerm - The word or term we're searching for.
 * @returns {boolean} - true if a content piece has content or false otherwise.
 * */ 
function checkContentPieceForTerm(contentPiece, searchTerm) {
    const text = contentPiece.Text;

    if (text != undefined){
        return text.includes(searchTerm);
    }

    return false; //Text property is missing
}

class MatchedContent {
    constructor(ISBN, Page, Line) {
      this.ISBN = ISBN;
      this.Page = Page;
      this.Line = Line;
    }
  }

class Result {
    constructor(SearchTerm, Results) {
      this.SearchTerm = SearchTerm;
      this.Results = Results;
    }
  }

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Empyt input object. */
const emptyIn = []

/** Empty Content input object. */
const emptyContentIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]

/** Empty results output object for 'the' term search on empty input object 
 * or empty content input onject or missing text input*/
const EmptyOut = {
    "SearchTerm": "the",
    "Results": []
}

/** Empty results output object for '' term search */
const EmptyTermOut = {
    "SearchTerm": "",
    "Results": []
}

/** Missing Text under content in input object. */
const emptyTextIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8
            },
            {
                "Page": 31,
                "Line": 9
            },
            {
                "Page": 31,
                "Line": 10
            } 
        ] 
    }
]

/** Multipe books as input. */
const multipleBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Weapons of Math Destruction",
        "ISBN": "9780553418835",
        "Content": [
            {
                "Page": 45,
                "Line": 14,
                "Text": "All of this is done in the name of health. Meanwhile, the"
            },
            {
                "Page": 45,
                "Line": 15,
                "Text": "$6 billion wellness industry trumpets its successes loudly-and"
            },
            {
                "Page": 45,
                "Line": 16,
                "Text": "often without offering evidence. \"Here are the Facts,\" writes"
            },
            {
                "Page": 45,
                "Line": 17
            },
            {
                "Page": 45,
                "Line": 18,
                "Text": ""
            } 
        ] 
    }
]

/** Multiple results of different books found as output object */
const multipleBooksOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780553418835",
            "Page": 45,
            "Line": 14
        },
        {
            "ISBN": "9780553418835",
            "Page": 45,
            "Line": 16
        }
    ]
}

/** Case-sensitive output object */
const caseSensitiveOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/** Multiple results found for non alphanumeric serach term as output object */
const multipleBooksNonAlphanumericOut = {
    "SearchTerm": "-",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780553418835",
            "Page": 45,
            "Line": 15
        }
    ]
}

/** Zero results found for "math" */
const zeroResultsFoundOut = {
    "SearchTerm": "math",
    "Results": []
}

/** Multipe books including a book with missing ISBN as input. */
const booksWithMissingISBNIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Weapons of Math Destruction",
        "ISBN": "",
        "Content": [
            {
                "Page": 45,
                "Line": 14,
                "Text": "All of this is done in the name of health. Meanwhile, the"
            },
            {
                "Page": 45,
                "Line": 15,
                "Text": "$6 billion wellness industry trumpets its successes loudly-and"
            },
            {
                "Page": 45,
                "Line": 16,
                "Text": "often without offering evidence. \"Here are the Facts,\" writes"
            }
        ] 
    }, 
    {
        "Title": "Weapons of Math Destruction 2",
        "Content": [
            {
                "Page": 2,
                "Line": 2,
                "Text": "All of this is done in the name of health. Meanwhile, the"
            }
        ] 
    }
]

/** Multiple results of different books where some have the ISBN missing found as output object */
const multipleBooksWithMissingISBNOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "",
            "Page": 45,
            "Line": 14
        },
        {
            "ISBN": "",
            "Page": 45,
            "Line": 16
        }, 
        {
            "ISBN": undefined,
            "Page": 2,
            "Line": 2
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We can check that, given known multiple inputs, we get known multiple results as output. */
const test3result = findSearchTermInBooks("the", multipleBooksIn);
if (JSON.stringify(multipleBooksOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", multipleBooksOut);
    console.log("Received:", test3result);
}

/** We can check that, given known multiple inputs, we get known multiple results as output 
 * for a non alphanumeric input. */
const test4result = findSearchTermInBooks("-", multipleBooksIn);
if (JSON.stringify(multipleBooksNonAlphanumericOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", multipleBooksNonAlphanumericOut);
    console.log("Received:", test4result);
}

/** We can check that, given known empty inputs, we get empty results as output*/
const test5result = findSearchTermInBooks("the", emptyIn);
if (JSON.stringify(EmptyOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", EmptyOut);
    console.log("Received:", test5result);
}

/** We can check that, given known inputs with empty content, we get empty results as output*/
const test6result = findSearchTermInBooks("the", emptyContentIn);
if (JSON.stringify(EmptyOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", EmptyOut);
    console.log("Received:", test6result);
}

/** We can check that, given known multiple inputs and an empty string search term, we get empty 
 * results as output. */
const test7result = findSearchTermInBooks("", multipleBooksIn);
if (JSON.stringify(EmptyTermOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", EmptyTermOut);
    console.log("Received:", test7result);
}

/** We can check that, given a known input, we get zero matches. */
const test8result = findSearchTermInBooks("math", twentyLeaguesIn);
if (JSON.stringify(zeroResultsFoundOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", zeroResultsFoundOut);
    console.log("Received:", test8result);
}

/** We can check that, given a known case sensitive input, we get known matches. */
const test9result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(caseSensitiveOut) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", caseSensitiveOut);
    console.log("Received:", test9result);
}

/** We can check that, given a known input with missing text, we get zero results. */
const test10result = findSearchTermInBooks("the", emptyTextIn);
if (JSON.stringify(EmptyOut) === JSON.stringify(test10result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", EmptyOut);
    console.log("Received:", test10result);
}

/** We can check that, given a known input with multiple books that include empty ISBN or missing ISBN, we still get results. */
const test11result = findSearchTermInBooks("the", booksWithMissingISBNIn);
if (JSON.stringify(multipleBooksWithMissingISBNOut) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", multipleBooksWithMissingISBNOut);
    console.log("Received:", test11result);
}