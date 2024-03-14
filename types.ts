type CategoriesType = {
  name: string;
  icon: string;
};

type CountriesType = {
  value: string;
  label: string;
};

type HomesType = {
  id: any;
  price: any;
  title: any;
  image: any;
  city: any;
  state: any;
  country: any;
  description: any;
  user_id: any;
  created_at: any;
  users: {
    name: any;
  };
};

type DateStateType = {
  startDate: Date ;
  endDate: Date;
  key: string;
};

type SearchParamsType = {
  country: string;
  weeks: string;
};

type ReservaType = {
  id: any;
  created_at: any;
  id_uid: any;
  date_ini: any;
  date_fin: any;
  pay: any;
  num_person: any;
  id_hotel: any;
}

interface DateRange {
  startDate: Date ;
  endDate: Date;
  key: string;
 }

 interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
 }
 


 