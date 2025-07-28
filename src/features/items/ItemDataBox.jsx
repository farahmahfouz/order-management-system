import styled from "styled-components";
import { format  } from"date-fns";
import {
    HiOutlineCurrencyDollar,
    HiOutlineClipboardDocumentList,
    HiOutlineClock,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { formatCurrency } from "../../utils/helpers";

const StyledOrderDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
  display: flex;
  gap: 2rem;
  flex: 1;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemsList = styled.div`
  margin-bottom: 2rem;
  
  & h4 {
    margin-bottom: 1rem;
    color: var(--color-grey-700);
    font-weight: 600;
  }
`;

const ItemRow = styled.div`
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  
  &:last-child {
    border-bottom: none;
  }
  
  & .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  & .item-name {
    font-weight: 500;
    color: var(--color-grey-700);
  }
  
  & .item-price {
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
  
  & .quantity {
    background-color: var(--color-grey-100);
    padding: 0.2rem 0.8rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  & .total {
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: auto;
  background-color: var(--color-indigo-100);
  color: var(--color-indigo-700);

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
  background-color: var(--color-grey-50);
  border-top: 1px solid var(--color-grey-100);
  margin-top: auto;
`;

const Img = styled.img`
  display: block;
  width: 26rem;  
  height: 28rem;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
`;

function ItemDataBox({ item }) {
    const {
        _id,
        updatedAt,
        name,
        price,
        image,
        expiryDate,
        description,
    } = item;

    return (
        <StyledOrderDataBox>
            <Header>
                <div>
                    <HiOutlineClipboardDocumentList />
                    <p>Item <span>#{_id.slice(-6)}</span></p>
                </div>
            </Header>

            <Section>
                <ImageContainer>
                    <Img src={image || 'logo.png'} alt={name} />
                </ImageContainer>
                
                <ContentContainer>
                    <ItemsList>
                        <ItemRow>
                            <div className="item-info">
                                <span className="item-name">{name}</span>
                                <span className="item-price">
                                    {formatCurrency ? formatCurrency(price) : `$${price}`}
                                </span>
                            </div>
                        </ItemRow>
                        
                        {description && (
                            <div style={{ marginTop: '1rem', color: 'var(--color-grey-600)' }}>
                                {description}
                            </div>
                        )}
                        
                        {expiryDate && (
                            <div style={{ marginTop: '6rem', color: 'var(--color-grey-600)' }}>
                                <strong>Expires:</strong> {format(new Date(expiryDate), "MMM dd, yyyy")}
                            </div>
                        )}
                    </ItemsList>

                    <Price>
                        <DataItem icon={<HiOutlineCurrencyDollar />} label="Price">
                            {formatCurrency ? formatCurrency(price) : `$${price}`}
                        </DataItem>
                        <p>Item Price</p>
                    </Price>
                </ContentContainer>
            </Section>

            <Footer>
                <p>
                    <HiOutlineClock style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Created {format(new Date(updatedAt), "EEE, MMM dd yyyy, p")}
                </p>
            </Footer>
        </StyledOrderDataBox>
    );
}

export default ItemDataBox;