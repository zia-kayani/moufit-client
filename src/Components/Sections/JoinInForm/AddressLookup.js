import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const AddressAutocomplete = ({data, useFormPropsObj, setNextBtnDisplay}) => {
  const { register, getValues, setValue, checkUserFieldVals } = useFormPropsObj;
  const { index, target } = data;

  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!window.google) {
      console.error('Google Maps JavaScript API library must be loaded.');
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    if (input === '') {
      setOptions([]);
      return undefined;
    }

    setLoading(true);
    autocompleteService.getPlacePredictions({ input }, (results, status) => {
      if (active) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setOptions(results || []);
        } else {
          setOptions([]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [input]);

  const handleSelect = (event, value) => {
    if (value) {
      const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
      placesService.getDetails({ placeId: value.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const addressComponents = place.address_components;
          const getComponent = (type) => {
            const component = addressComponents.find(comp => comp.types.includes(type));
            return component ? component.long_name : '';
          };

          const country = getComponent('country');
          const state = getComponent('administrative_area_level_1');
          const city = getComponent('locality');

          if(country && state && city) {
            setValue(`locations[${index}].lat`, place?.geometry?.location?.lat() ?? "");
            setValue(`locations[${index}].long`, place?.geometry?.location?.lng() ?? "");
            setValue(`locations[${index}].address1`, place?.formatted_address ?? "");
            setValue(`locations[${index}].address2`, place?.formatted_address ?? "");
            setValue(`locations[${index}].region`, country ?? "");
            setValue(`locations[${index}].state`, state ?? "");
            setValue(`locations[${index}].city`, city ?? "");
  
          } else {
            setNextBtnDisplay(false)
          }


          console.log(getValues('locations'))
        }
      });
    } else {
      setValue(`locations[${index}].lat`, "");
      setValue(`locations[${index}].long`, "");
      setValue(`locations[${index}].address1`, "");
      setValue(`locations[${index}].address2`, "");
      setValue(`locations[${index}].region`, "");
      setValue(`locations[${index}].state`, "");
      setValue(`locations[${index}].city`, "");
    }
  };

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      freeSolo
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInput(newInputValue);
      }}
      onChange={handleSelect}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#fff',
          paddingLeft: '20px', paddingRight: '20px',
          width: '102.5%'
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search address"
          variant="outlined"
          size='small'
          fullWidth
          autoComplete="off"
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
  );
};

export default AddressAutocomplete;
