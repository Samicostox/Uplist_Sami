import React from "react";
import MarketplaceService from "../../request-model/services/markeplace/marketplace.service";
import TokenService from "../../request-model/services/token.service";
import Marketplace from "./marketplace";


const MarketplaceController = (props) => {

    const [loading, setLoading] = React.useState(true)
    const [state, setState] = React.useState({
        linkpages: [],
        filteredLinkpages: [],
    })
    
    const handleMultiSelectChange = async (selectedOptions) => {

        let newOptions = []
        for (let i = 0; i < selectedOptions.length; i++) {
            newOptions.push(selectedOptions[i].value)
        }
        filterCallback(newOptions)

    };

     React.useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const resp = await MarketplaceService.getMarketplace()

                if (resp.status === 200) {
                    const  username   = TokenService.getUser()?.username;

                    // filter out the current user
                    let data = resp.data
                    if (username) {
                        data = data.filter((linkpage) => linkpage.user.username !== username);
                    } 
                    setState({
                        linkpages: data,
                        filteredLinkpages: data,
                    })
                    // mock state for now
                    
                }
            } catch (error) {
                console.log(error)
                props.errorCallback("Something went wrong, please try again later")
            }


            
            setLoading(false)
        }
        fetchData()
    }, [props])

     const filterCallback = async (filter) => {
        if (filter.length === 0) {

            let oldLinkpages = state.linkpages
            setState(prevState => ({
                ...prevState,
                filteredLinkpages: oldLinkpages
            }));
            return
        }
        // mock the filter
   
    
        // filter is an array of artistType
        // filter the linkpages based on the tags

        let newLinkpages = []
        for (let i = 0; i < state.linkpages.length; i++) {
             // Removed for now since only one tag is per account (artist_type)
            // for (let j = 0; j < state.linkpages[i].tags.length; j++) {
            //     for (let k = 0; k < filter.length; k++) {
            //         if (state.linkpages[i].tags[j] == filter[k]) {
            //             newLinkpages.push(state.linkpages[i])
            //             // break out of the filter loop
            //             found = true
            //             break
            //         }
            //     }
            //     if (found) {
            //         // break out of the tag loop
            //         break
            //     }
            // }
            for (let k = 0; k < filter.length; k++) {
                if (state.linkpages[i].user.artist_type === filter[k]) {
                    newLinkpages.push(state.linkpages[i])
                    // break out of the filter loop
                    break
                }
            }
          
        }

        setState({
            ...state,
            filteredLinkpages: newLinkpages
        })
    }

    
   
    const handleSearch = async (searchTerm) => {
        try{
            let searchResponse = await MarketplaceService.getMarketplace(searchTerm)
            if (searchResponse.status === 200) {
                setState(prevState => ({
                    ...prevState,
                    linkpages: searchResponse.data,
                    filteredLinkpages: searchResponse.data,
                }));
                if (searchResponse.data.length === 0) {
                    props.errorCallback("No results found")
                }
            }
        } catch (error) {
            props.errorCallback("Something went wrong, please try again later")
        }
    }

    return (
        <Marketplace 
            loading={loading}
            handleSearch={handleSearch}
            state={state}
            handleMultiSelectChange={handleMultiSelectChange}
        />
    )

}

export default MarketplaceController;