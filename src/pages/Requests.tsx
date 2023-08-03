import { useQuery } from "react-query";
import featchData from "../services/products";
import style from "../styles/Requests.module.css"
import { RiArrowDropDownLine } from "react-icons/ri"
import { Ref, forwardRef, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomInputProps, IAction, INicialState, IProduct } from "../interfaces/IRequests";

const inicialState = {
  company: "all",
  validate: null,
  price: 0
}

const reducer = (state: INicialState, action: IAction) => {
  switch (action.type) {
    case "company":
      return { ...state, company: action.value };
    case "validate":
      return { ...state, validate: action.value };
    case "price":
      return { ...state, price: action.value };
    default:
      return state;
  }
};

function Requests() {
  const [filters , dispatch] = useReducer(reducer, inicialState);
  const { data, error, isError } = useQuery("products", featchData)
  
  const CustomInput = forwardRef(
    ({ value, onClick }: CustomInputProps, ref: Ref<HTMLButtonElement>) => (
      <button onClick={onClick} ref={ref} className={style.customInput}>
        {filters.validate === null ? <>Validade <RiArrowDropDownLine /> </> : value}
      </button>
    )
  );

    return (
        <div className={style.main} >
          <span style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
            <h2>Pedidos</h2>
            <span className={style.buttonsContainer}>
                <button className={style.button}>Criar orçamento +</button>
                <button className={style.confirmButton}>Add Pedido +</button>
            </span>
          </span>
          <ul className={style.filterlist}>
            <li>Todos</li>
            <li>Em andamento</li>
            <li>Finalizados</li>
            <li>Orçamentos</li>
          </ul>
          <div className={style.filters}>
            <span>
              <h3>Filtrar por</h3>
              <select name="" id="" className={style.companyFilter}>
                <option value="all">Compania</option>
                {data?.map(({companyId, companyName}: IProduct ) => 
                <option value={companyId} key={companyId}>
                  {companyName}
                </option>
                )}
              </select>
            </span>
            <label htmlFor="">
              <DatePicker 
                selected={filters.validate} 
                onChange={(value: Date) => dispatch({type: "validate", value})}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Data "
                startDate={new Date()}
                customInput={ <CustomInput />}
                />
            </label>
          </div>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.tag}>
                  <span>Produto</span>
                </th> 
                <th className={style.tag}>
                  <span>Companhia</span>
                 </th>
                <th className={style.tag}>
                  <span>Validade</span>
                </th>
                <th className={style.tag}>
                  <select name="" id="">
                      <option value="valor">Valor &#x25BE;</option>
                      <option value="1000">Até 1000,00</option>
                      <option value="500">Até 500,00</option>
                      <option value="250">Até 250,00</option>
                      <option value="100">Até 100,00</option>
                  </select>
                </th>
                <th className={style.tag}>Peso</th>
              </tr>
            </thead>
            <tbody>
            { isError ? console.log(error) : data?.map(({id, companyName, productName,
            price, expirationDate, productImage, weight}: IProduct) => (
              <tr key={id}>
                <td style={{display: "flex", alignItems: "center"}}>
                  <div style={{display: "flex", alignItems: "center", flexGrow: 1}}>
                    <img src={productImage}
                        alt={productName} width="50px" height="50px" />
                    <p className={style.tableContent} 
                    style={{margin: "0 0 0 10px", width: "100%"}}>
                      {productName}</p>
                  </div>
                </td>
                <td className={style.tableContent}>
                  <span style={{margin: "5px"}}>{companyName}</span>
                </td>
                <td className={style.tableContent}>
                  <span>{new Date(expirationDate).toLocaleDateString()}</span>
                </td>
                <td className={style.tableContent}>
                  <span>{price}</span>
                </td>
                <td className={style.tableContent}>
                  <span>{weight}</span>
                </td>
              </tr>
              )
              )}
            </tbody>
          </table>
          <span className={style.buttonsContainer}>
                <button className={style.button}>Voltar</button>
                <button className={style.confirmButton}>Próxima</button>
          </span>
        </div>
    );
}

export default Requests;