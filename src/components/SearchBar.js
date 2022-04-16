import { useState, useMemo } from 'react'
import { TextField, Autocomplete, CircularProgress } from '@mui/material/'
import debounce from '../utils/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { setLocations, getSearchedLocations, setCurrentLocation } from '../redux/location/locationsSlice'
import { useStyles } from '../styles.js/global'


const SearchBar = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const locations = useSelector(state => state.locations.locations)
    const loading = useSelector(state => state.locations.loading)

    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const getSearchedLocationsDebounced = useMemo(() => debounce((value) => {
        dispatch(getSearchedLocations(value))
    }), [])

    const isValidSearchTerm = (searchTerm) => {
        return /^[A-Za-z\s\-\']*$/.test(searchTerm)
    }    

    const handleSearch = (value) => {
        if (!isValidSearchTerm(value)) return

        setSearchTerm(value)
        getSearchedLocationsDebounced(value)
    }

    const handleSelect = (selectedCity) => {
        if (!selectedCity) {
            setSearchTerm('')
            dispatch(setLocations([]))
            return
        }

        setSearchTerm(selectedCity.LocalizedName)

        dispatch(setCurrentLocation({
            code: selectedCity.Key,
            name: selectedCity.LocalizedName,
        }))
    }

    const noOptionsText = (searchTerm.length === 0) ? 'Start typing a city name' : 'No cities found'

    return (
        <Autocomplete
            id="locations"
            open={open}
            onOpen={() => setOpen(true) }
            onClose={() => setOpen(false) }
            noOptionsText={noOptionsText}
            renderOption={(props, option) =>
                <li {...props}>{option.LocalizedName}
                    <div className={classes.optionCountry}>{option.Country.LocalizedName}
                    </div>
                </li>}
            onChange={(e, selectedCity) => { handleSelect(selectedCity) }}
            isOptionEqualToValue={(option, value) => option.Key === value.Key}
            getOptionLabel={(option) => option.LocalizedName}
            options={locations || []}
            inputValue={searchTerm}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Search City"
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}

export default SearchBar
