import { useState, useEffect } from 'react';
import styled from 'styled-components';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
import { Select, Icon } from 'semantic-ui-react';
import { createNumberOptions } from '../../utils/utils';

const SelectorOne = ({ values, title, handleChange }) => {
  //construct options object for the select
  const options = values.map((value) => {
    return {
      key: value.value,
      value: value.value,
      text: value.value,
    };
  });
  return (
    <Select
      aria-label={title}
      options={options}
      placeholder={title}
      onChange={handleChange}
      fluid={true}
    />
  );
};
const SelectorTwo = ({ values, title, handleChange }) => {
  //construct options object for the select
  const options = values.map((value) => {
    return {
      key: value.value,
      value: value.value,
      text: value.value,
    };
  });
  return (
    <Select
      aria-label={title}
      options={options}
      placeholder={title}
      onChange={handleChange}
      fluid={true}
    />
  );
};

const QtyBuy = ({ quantity, handleQty, number, handleClick }) => {
  const options = createNumberOptions(number);

  return (
    <BuyWrapper>
      <InputWrapper>
        <Select
          aria-label='Quantity'
          options={options}
          placeholder={`${quantity}`}
          onChange={handleQty}
          fluid={true}
        />
      </InputWrapper>
      <ButtonWrapper>
        <BuyButton onClick={handleClick}>
          <Icon name='add to cart' />
        </BuyButton>
      </ButtonWrapper>
    </BuyWrapper>
  );
};

const BuyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const BuyButton = styled.button`
  padding-top: 0.25rem;
  width: 3rem;
  height: 2.8rem;
  text-align: center;
  background: lightgrey;
  border: none;
  border-radius: 0.25rem;
`;

const SelectedImage = ({ selectedImg, imageClick, images, alt }) => {
  return (
    <ImagesWrapper>
      <FeatureWrapper>
        <Image src={selectedImg} alt={alt} />
      </FeatureWrapper>
      <ThumbnailWrapper>
        {images.map((image) => {
          return (
            <Thumb
              key={image.id}
              src={image.src}
              alt={alt}
              onClick={() => imageClick(image.src)}
            />
          );
        })}
      </ThumbnailWrapper>
    </ImagesWrapper>
  );
};

const Image = styled.img`
  width: 100%;
  height: auto;
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const Thumb = styled.img`
  width: 8rem;
  height: auto;
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: center;
`;
const ImagesWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
`;

const FeatureWrapper = styled.div`
  align-self: center;
`;

const ProductDescription = ({ product }) => {
  return (
    <DescriptionWrapper>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div`
  padding: 2rem 0;
  width: 80%;
  margin: 0 auto;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem 0;
`;
const Description = styled.p`
  line-height: 1.45;
  text-align: center;
`;
const TwoOptionProduct = ({ product }) => {
  //for a product with to options render selectors and filter selections for target variantId
  const [selected, setSelected] = useState(product.variants);
  const [selectedImg, setSelectedImg] = useState(product.images[0].src);
  const [selectOne, setSelectOne] = useState();
  const [selectTwo, setSelectTwo] = useState();
  const [filter, setFilter] = useState('');
  const [quantity, setQuantity] = useState(1);
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
  //seperate the two options arrays
  const optionOne = product.options[0];
  const optionTwo = product.options[1];

  //create filter from the two selections
  useEffect(() => {
    setFilter(() => selectOne + ' ' + '/' + ' ' + selectTwo);
  }, [selectOne, selectTwo]);

  //filter the array of variants for the created filter and return selected varaiant
  useEffect(() => {
    const filtered = product.variants.filter((variant) => {
      return variant.title.includes(filter);
    });
    setSelected(() => filtered);
  }, [filter]);

  const handleClick = async () => {
    try {
      await addItemToCart(selected[0].id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  //set respective states from the individual selects
  const handleChangeOne = (e, data) => {
    e.preventDefault();
    setSelectOne(() => data.value);
  };

  const handleChangeTwo = (e, data) => {
    e.preventDefault();
    setSelectTwo(() => data.value);
  };

  const handleQty = (e, data) => {
    e.preventDefault();
    setQuantity(() => data.value);
  };
  const imageClick = (src) => {
    console.log('change image');
    setSelectedImg(src);
  };
  return (
    <PageWrapper>
      <SelectedImage
        selectedImg={selectedImg}
        imageClick={imageClick}
        images={product.images}
        alt={product.title}
      />
      <DescriptionBuyWrapper>
        <ProductDescription product={product} />
        <SelectorWrapper>
          <SelectorOne
            values={optionOne.values}
            title={optionOne.name}
            handleChange={handleChangeOne}
          />
          <SelectorTwo
            values={optionTwo.values}
            title={optionTwo.name}
            handleChange={handleChangeTwo}
          />
        </SelectorWrapper>
        <FilterBuyWrapper>
          <Filter>{filter.includes('undefined') ? '' : filter}</Filter>
          <QtyBuy
            quantity={quantity}
            handleQty={handleQty}
            number={10}
            handleClick={handleClick}
          />
        </FilterBuyWrapper>
      </DescriptionBuyWrapper>
    </PageWrapper>
  );
};
const SelectorWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
`;

const FilterBuyWrapper = styled.div`
  width: 80%;
  padding-top: 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Filter = styled.p`
  text-align: center;
  width: 100%;
`;

const PageWrapper = styled.div`
  @media (min-width: 1024px) {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;

const DescriptionBuyWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    @media (min-width: 1024px) {
      width: 50%;
    }
  }
`;

export default TwoOptionProduct;
