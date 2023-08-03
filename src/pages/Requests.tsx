import { useQuery } from "react-query";
import featchData from "../services/products";
import style from "../styles/Requests.module.css"
import { RiArrowDropDownLine } from "react-icons/ri"
import { LiaSearchSolid } from "react-icons/lia"
import { Ref, forwardRef, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomInputProps, IAction, INicialState, IProduct } from "../interfaces/IRequests";
import { filterProducts } from "../utils/filterProducts";

const inicialState = {
  company: "all",
  validate: null,
  price: "all",
  name: ""
}

const reducer = (state: INicialState, action: IAction) => {
  switch (action.type) {
    case "company":
      return { ...state, company: action.value };
    case "validate":
      return { ...state, validate: action.value };
    case "price":
      return { ...state, price: action.value };
    case "name":
      return { ...state, name: action.value };
    default:
      return state;
  }
};

function Requests() {
  const [filters , dispatch] = useReducer(reducer, inicialState);
  const { data, isLoading } = useQuery("products", featchData)

  const onChangeDispatch = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({type: name, value})
  }

  const filteredProducts = isLoading ? [] : filterProducts(data, filters);
  
  const CustomInput = forwardRef(
    ({ value, onClick }: CustomInputProps, ref: Ref<HTMLButtonElement>) => (
      <button onClick={onClick} ref={ref} className={style.customInput}>
        {filters.validate === null ? <>Validade <RiArrowDropDownLine style={{fontSize: "1.4rem"}}/> </> : value}
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
            <span style={{
              display: "flex", 
              alignItems: "center",
              justifyContent: "space-between", 
              maxWidth: "400px", 
              width: "400px"
              }}>
              <h4>Filtrar por</h4>
              <select name="company" className={style.companyFilter} onChange={onChangeDispatch}>
                <option value="all">Compania</option>
                {data?.map(({companyId, companyName}: IProduct ) => 
                <option value={companyId} key={companyId}>
                  {companyName}
                </option>
                )}
              </select>
              <label htmlFor="">
                <DatePicker 
                  selected={filters.validate}
                  onChange={(value: Date) => dispatch({type: "validate", value})}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  startDate={new Date()}
                  customInput={ <CustomInput />}
                  />
              </label>
            </span>
            <span>
            <label htmlFor="name">
              <input type="text" name="name" id="name" onChange={onChangeDispatch} placeholder="Nome" className={style.search}/>
            </label>
              <LiaSearchSolid />
            </span>
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
                  <select name="price" onChange={onChangeDispatch}>
                      <option value="all">Valor &#x25BE;</option>
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
              {filteredProducts.length > 0 ? (
              filteredProducts.map(({ id, companyName, productName, price, expirationDate, productImage, weight }) => (
                <tr key={id}>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                      <img src={productImage} alt={productName} width="50px" height="50px" />
                      <p style={{ margin: "0 0 0 10px", width: "100%" }}>{productName}</p>
                    </div>
                  </td>
                  <td><span style={{ margin: "5px" }}>{companyName}</span></td>
                  <td><span>{new Date(expirationDate).toLocaleDateString()}</span></td>
                  <td><span>{price}</span></td>
                  <td><span>{weight}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhum produto encontrado.</td>
              </tr>
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