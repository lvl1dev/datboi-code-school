// this is where we will eventually store imports

// declaring our constant variables
const ME_SYMBOL = "datbois";
const act_per_call = 1000;

async function get_collection_activities() {
  // saying 'let' to create a temporarily empty array '[]' giving the array a name of 'saledata'
  let saledata = [];
  // forming our url to the magic eden api. we use the backtick `url` instead of "url" to declare that this is a template. the use of ${ME_SYMBOL} and ${act_per_call} tells the code to insert our previously declared valuable into our template url
  const url = `https://api-mainnet.magiceden.dev/v2/collections/${ME_SYMBOL}/activities?offset=0&limit=${act_per_call}`;
  // we're saying datboi_data is equal to fetching the url, and turning the response into json. notice i used 'await' and used .then
  const datboi_data = await fetch(url).then((response) => response.json());
  // this is us looping through the data from fetching the url. we're saying i = 0, and if the data is greater than 0, go through each response
  for (let i = 0; i < datboi_data.length; i++) {
    // if we did 'console.log(datboi_data[i])' right here, it would spit out each sale object one by one because we're inside the loop.
    // we basically gave our code a stack of cards, and we want to go through each card one by one, and if the 'type' of card is equal to 'buyNow' aka a sale, we're telling our previous empty array (line 9) to add that card.
    if (datboi_data[i]["type"] === "buyNow") {
      ret.push(datboi_data[i]);
    }
  }
  // we're outside of the loop and back in our function. since we're calling this function 'get_collection_activities' from a different function 'main', we want to return the data. if we didn't have a return here, our code wouldn't know wtf to grab from this.

  // long story short, basically what we did is created an empty array of data, grabbed data from the magic eden API, took the shit we wanted and placed it in the empty array, and we're giving it back to the main() function
  return saledata;
}

async function get_metadata(mint) {
  // notice this function has a parameter of 'mint'^ so if we ever call this function, it needs to include that parameter
  const url = `https://api-mainnet.magiceden.dev/v2/tokens/${mint}`;
  const datboi_metadata = await fetch(url).then((response) => response.json());
  return datboi_metadata;
}

async function main() {
  // declaring sales data
  const sales = await get_collection_activities();
  // grabbing metadata from the nft in our sales data. we use [0] just to indicate that we only want to use the first object. incase sales gave us like 50 sales, we only wanna grab the very first 1.
  const metadata = await get_metadata(sales[0]["tokenMint"]);
  console.log("sale: ", sales[0], "metadata: ", metadata);
}

// calling our main function
main();
