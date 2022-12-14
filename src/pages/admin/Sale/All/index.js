import React, { useEffect } from "react";
import { EditIcon, EyeIcon } from "../../../../components/icones";
import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import PageHeader from "../../../../components/pageheader";
import { useNavigate } from "react-router-dom";
import { HTTP_CLIENT } from "../../../../api/client";
import { alertPending } from "../../../../components/notification";
import { openNotificationWithIcon } from "../../../../components/alert";
import { Empty, Pagination, Spin } from "antd";

const AllSell = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = React.useState(true);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const dateFormat = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };
  useEffect(
    () => {
      console.log(dateFormat(startDate));
      (async () => fetchVenteByDate(dateFormat(startDate), current))();
    },
    [startDate],
    [current]
  );
  const [vente, setVente] = useState([]);
  const date = dateFormat(startDate);
  const fetchVenteByDate = async (date, page) => {
    await HTTP_CLIENT.get(
      `http://localhost:8000/api/history/${dateFormat(startDate)}/${page}`
    )
      .then((response) => {
        const data = response?.data?.data;

        setVente(data?.data);
		console.log(data);
        setCurrent(data?.current_page);
        setTotal(data?.total);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        openNotificationWithIcon(
          "error",
          "Erreur",
          "Erreur de connexion au serveur Veuillez reessayer"
        );
      });
  };

  return (
    <>
      <PageHeader title="Listes des Ventes" route={"/add_sale"} />
      <div class="col-10 offset-2 col-xxl-9 d-flex">
        <div class="card flex-fill">
          <div class=" card-header d-flex">
            <h5 class=" col-md-2 card-title">Listes des ventes</h5>

            <div class="col-md-2 offset-md-7">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <table class="table table-hover my-0">
            <thead>
              <tr>
                <th class="text-center">Nom du client</th>

                <th class="text-center">Marque</th>
                <th class="text-center">Nom du commerciale</th>
                <th class="text-center">Montant Paye</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {vente.map((vente, index) => (
                <tr key={index}>
                  <td class="text-center">{vente?.nom_client}</td>
                  <td class="d-none d-md-table-cell text-center">
                    {vente?.marque}
                  </td>
                  <td class="d-none d-md-table-cell text-center ">
                    {" "}
                    {vente?.pseudo_commerciale}
                  </td>
                  <td class="d-none d-md-table-cell text-center">
                    {vente?.montant_verse} FCFA
                  </td>
                  <td class="d-none d-md-table-cell text-center">
                    <button
                      class="btn btn-secondary btn-sm"
                      onClick={() => {
                        navigate("/show_sale", { state: vente });
                      }}
                    >
                      {" "}
                      <EyeIcon /> Details
                    </button>{" "}
                    <button
                      class="btn btn-primary btn-sm"
                      onClick={() => {
                        navigate("/edit_sale", { state: vente });
                      }}
                    >
                      {" "}
                      <EditIcon /> Modifier
                    </button>
                  </td>
                </tr>
              ))}
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center">
				  <Spin />;
                  </td>
                </tr>
              ) : null}
              {!isLoading && vente.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                   <Empty />
                  </td>
                </tr>
              ) : null}
            </tbody>
			{
				vente.length > 0 ? (
					
						<tr>
							<td colSpan="6">
								<Pagination current={current} total={total} onChange={(page) => setCurrent(page)} />
							</td>
						</tr>
						) : null

			}
          </table>
        </div>
      </div>
    </>
  );
};

export default AllSell;
