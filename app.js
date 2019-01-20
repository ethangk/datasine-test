function CustomerRow(props) {
  return (
    <tr key={props.id} scope="row">
      <td>{props.first_name}</td>
      <td>{props.last_name}</td>
      <td>{props.age}</td>
      <td>{props.company}</td>
      <td>{props.profession}</td>
      <td>{props.date_of_birth}</td>
      <td>{props.gender}</td>
      <td>{props.dominant_traits[0].level} {props.dominant_traits[0].primary_trait}</td>
    </tr>
  )
}

function Button(props) {
  const buttonClass = `btn btn-primary ${props.active ? 'active' : null}`;
  return (
    <button
      style={buttonStyle}
      className={buttonClass}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  )
}


class CustomerTable extends React.Component {
  render() {
    return(
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Company</th>
            <th>Profession</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          { this.props.customers.map(CustomerRow) }
        </tbody>
      </table>
    )
  }
}

const buttonStyle = {
  marginRight: '0.5rem',
  marginBottom: '0.5rem'
};

function GenderButtons(props) {
  const setFunction = (value) => {
    return () => props.setFunction(value);
  };

  return (
    <div className="row">
      <div className="col-2 h5">
        Gender
      </div>
      <div className="col-6">
        <Button title="Male" onClick={setFunction('male')} active={props.genderFilter === 'male'} />
        <Button title="Female" onClick={setFunction('female')} active={props.genderFilter === 'female'} />
        <Button title="Other" onClick={setFunction('other')} active={props.genderFilter === 'other'} />
      </div>
      <div className="col-4">
        <Button title="Clear" onClick={setFunction(null)} active={props.genderFilter === null} />
      </div>
    </div>
  )
}

function SortButtons(props) {
  const setFunction = (value) => {
    return () => props.setFunction(value);
  };

  return (
    <div className="row">
      <div className="col-2 h5">
        Sort
      </div>
      <div className="col-6">
        <Button title="First Name" onClick={setFunction('firstname')} active={props.sortType === 'firstname'} />
        <Button title="Surname" onClick={setFunction('surname')} active={props.sortType === 'surname'} />
        <Button title="Age" onClick={setFunction('age')} active={props.sortType === 'age'} />
      </div>
      <div className="col-4">
        <Button title="Clear" onClick={setFunction(null)} active={props.sortType === null} />
      </div>
    </div>
  );
}

function CompanyButton(props) {
  const setFunction = (value) => {
    return () => props.setFunction(value);
  };

  return (
    <div className="row">
      <div className="col-2 h5">
        Company
      </div>
      <div className="col-6">
        <select
          className="custom-select"
          onChange={(e) => props.setFunction(e.target.value)}
          value={props.companyFilter}
        >
          <option key={false} value={false}> </option>
          { props.companies.map(company => (
            <option key={company} value={company}>{company}</option>
          )) }
        </select>

      </div>
      <div className="col-4">
        <Button title="Clear" onClick={setFunction(false)} active={!props.companyFilter} />
      </div>
    </div>
  );
}

function ProfessionButton(props) {
  const setFunction = (value) => {
    return () => props.setFunction(value);
  };

  return (
    <div className="row">
      <div className="col-2 h5">
        Profession
      </div>
      <div className="col-6">
        <select
          className="custom-select"
          onChange={(e) => props.setFunction(e.target.value)}
          value={props.professionFilter}
        >
          <option key={false} value={false}> </option>
          {props.professions.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

      </div>
      <div className="col-4">
        <Button title="Clear" onClick={setFunction(false)} active={!props.professionFilter} />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genderFilter: null,
      sortType: null,

      companies: [],
      professions: [],

      companyFilter: false,
      professionFilter: false
    };

    this.filterData = this.filterData.bind(this);
    this.setSort = this.setSort.bind(this);
    this.setGenderFilter = this.setGenderFilter.bind(this);
    this.setCompanyFilter = this.setCompanyFilter.bind(this);
    this.setProfessionFilter = this.setProfessionFilter.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    let professions = [...new Set(nextProps.customers.map(customer => customer.profession).filter(c => !!c))];
    professions.sort();


    return {
      companies: [...new Set(nextProps.customers.map(customer => customer.company).filter(c => !!c))],
      professions
    };
  }

  genderFilter(gender) {
    let filterFunction = null;
    switch(gender) {
      case 'male':
        filterFunction = (c) => c.gender === 'Male';
        break;
      case 'female':
        filterFunction = (c) => c.gender === 'Female';
        break;
      case 'other':
        filterFunction = (c) => c.gender !== 'Male' && c.gender !== 'Female'
        break;
      default:
        filterFunction = (c) => true;
        break;
    }

    return filterFunction;
  }

  companyFilter(company) {
    if (!company) {
      return (c) => true;
    }

    return (customer) => customer.company === company;
  }

  professionFilter(profession) {
    if (!profession) {
      return (c) => true;
    }

    return (customer) => customer.profession === profession;
  }

  filterData(data) {
    return data
      .filter(this.genderFilter(this.state.genderFilter))
      .filter(this.companyFilter(this.state.companyFilter))
      .filter(this.professionFilter(this.state.professionFilter))
  }

  alphabeticalSortFunction(a, b, property) {
    const leftValue = a[property].toLowerCase();
    const rightValue = b[property].toLowerCase();
    if (leftValue < rightValue) { return -1; }
    if (leftValue > rightValue) { return 1; }
    return 0;
  }

  sortData(data, sortType) {
    let sortFunction = null;
    switch(sortType) {
      case 'age':
        sortFunction = (a, b) => a.age - b.age
        break;
      case 'firstname':
        sortFunction = (a, b) => this.alphabeticalSortFunction(a, b, 'first_name')
      break;
      case 'surname':
        sortFunction = (a, b) => this.alphabeticalSortFunction(a, b, 'last_name')
        break;
      default:
        sortFunction = () => 0;
        break;
    }
    let dataClone = data.slice(0);
    dataClone.sort(sortFunction);
    return dataClone;
  }

  setGenderFilter(genderFilter) {
    this.setState({
      genderFilter
    });
  }

  setSort(sortType) {
    this.setState({
      sortType
    });
  }

  setCompanyFilter(companyFilter) {
    this.setState({
      companyFilter: companyFilter === 'false' ? false : companyFilter
    });
  }

  setProfessionFilter(professionFilter) {
    this.setState({
      professionFilter: professionFilter === 'false' ? false : professionFilter
    });
  }

  render() {
    const data = this.sortData(
      this.filterData(this.props.customers),
      this.state.sortType
    );

    return (
      <React.Fragment>
        <GenderButtons
          genderFilter={this.state.genderFilter}
          setFunction={this.setGenderFilter}
        />
          
        <SortButtons
          sortType={this.state.sortType}
          setFunction={this.setSort}
        />

        <CompanyButton
          companies={this.state.companies}
          setFunction={this.setCompanyFilter}
          companyFilter={this.state.companyFilter}
        />

        <ProfessionButton
          professions={this.state.professions}
          setFunction={this.setProfessionFilter}
          professionFilter={this.state.professionFilter}
        />

        <CustomerTable customers={data} />
      </React.Fragment>
    )
  }
}

setTimeout(main, 1);

function main() {
  retrieveCustomers().then(customers => {
    ReactDOM.render(
      <App customers={customers}/>,
      document.getElementById('root')
    );
  });

}