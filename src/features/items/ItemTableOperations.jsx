import styled from "styled-components";

import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import TableOperations from "../../ui/TableOperations";
import { handleDownload, handleUpload } from "../../services/apiItems";

import { HiOutlineFolderDownload } from "react-icons/hi";
import { MdUpload } from "react-icons/md";


const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

function ItemTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="category"
                options={[
                    { value: "all", label: "All" },
                    { value: "food", label: "Food" },
                    { value: "beverages", label: "Beverages" },
                    { value: "others", label: "Others" },
                ]}
            />

            <SortBy
                options={[
                    { value: "-createdAt", label: "Sort by date (recent first)" },
                    { value: "createdAt", label: "Sort by date (earlier first)" },
                    {
                        value: "-stockQuantity",
                        label: "Sort by total stock (high first)",
                    },
                    {
                        value: "stockQuantity",
                        label: "Sort by total stock (low first)",
                    },
                ]}
            />

            <ButtonGroup>
                <TooltipWrapper>
                    <Button variation="secondary" onClick={handleDownload}>
                        <HiOutlineFolderDownload />
                    </Button>
                    <TooltipText className="tooltip-text">Export CSV</TooltipText>
                </TooltipWrapper>

                <TooltipWrapper>
                    <Button>
                        <label htmlFor="fileUpload" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <MdUpload />
                            <input
                                style={{ display: "none" }}
                                id="fileUpload"
                                type="file"
                                onChange={(e) => handleUpload(e.target.files[0])}
                            />
                        </label>
                    </Button>
                    <TooltipText className="tooltip-text">Import CSV</TooltipText>
                </TooltipWrapper>
            </ButtonGroup>

        </TableOperations>
    );
}

export default ItemTableOperations;
