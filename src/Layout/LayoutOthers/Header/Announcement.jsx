import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #1c1818;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Ưu đãi siêu khủng! Giao hàng miễn phí cho các đơn đặt hàng trên $ 50</Container>;
};

export default Announcement;
