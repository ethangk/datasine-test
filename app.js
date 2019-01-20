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
  return (
    
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genderFilter: null,
      sortType: null
    };

    this.setFilter = this.setFilter.bind(this);
    this.filterData = this.filterData.bind(this);
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

  sortData(data, sortType) {
    let sortFunction = null;
    switch(sortType) {
      case 'age':
        sortFunction = (a, b) => a.age - b.age
        break;
      default:
        sortFunction = () => 0;
        break;
    }
    let dataClone = data.slice(0);
    dataClone.sort(sortFunction);
    return dataClone;
  }

  setFilter(filterType) {
    this.setState({
      filterType
    });
  }

  setSort(sortType) {
    this.setState({
      sortType
    });
  }

  render() {
    const data = this.sortData(
      this.filterData(this.props.customers, this.state.filterType),
      this.state.sortType
    );

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2 h5">
            Gender
          </div>
          <div className="col-10">
            <Button title="Male" onClick={() => this.setFilter('male')} active={this.state.filterType === 'male'} />
            <Button title="Female" onClick={() => this.setFilter('female')} active={this.state.filterType === 'female'} />
            <Button title="Other" onClick={() => this.setFilter('other')} active={this.state.filterType === 'other'} />
            <Button title="Clear" onClick={() => this.setFilter(null)} active={this.state.filterType === null} />
          </div>
        </div>
          
        <div className="row">
          <div className="col-2 h5">
            Sort
          </div>
          <div className="col-10">
            <Button title="Age" onClick={() => this.setSort('age')} active={this.state.sortType === 'age'} />
            <Button title="Clear" onClick={() => this.setSort(null)} active={this.state.sortType === null} />
          </div>
        </div>

        <div className="row">
          <div className="col-2 h5">
            Sort
          </div>
          <div className="col-10">
            <Button title="Age" onClick={() => this.setSort('age')} active={this.state.sortType === 'age'} />
            <Button title="Clear" onClick={() => this.setSort(null)} active={this.state.sortType === null} />
          </div>
        </div>
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