import api from '../api';

// marketplace routes
const getMarketplace = (searchTerm=undefined) => {
    if (searchTerm) {
        return api.get('/marketplace/?search='+searchTerm);
    }
    else{
        return api.get('/marketplace/');
    }
}

const MarketplaceService = {
    getMarketplace,
}

export default MarketplaceService;