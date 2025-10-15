import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FC, useRef } from "react";
import { AppState } from "./redux/store";
import { couponsMapSelector } from "./redux/selectors/cartSelector";
import { changeCouponCodeAction } from "./redux/slice/cartSlice";
import { connect, ConnectedProps } from "react-redux";

interface CouponCarouselProps extends ReduxProps {}

const CouponCarousel: FC<CouponCarouselProps> = ({
  coupons,
  changeCouponCode,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  if (!coupons || coupons.length === 0) {
    return (
      <div className="text-4xl text-rose-500 h-48 w-full flex items-center justify-center rounded-md">
        No coupons available.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-7 p-[2px] rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white rounded-xl p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Available Coupons
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
        >
          {coupons.map((coupon) => (
            <SwiperSlide
              key={coupon.couponCode}
              className="coupon-slide flex flex-col items-center cursor-pointer overflow-hidden rounded-md"
              onClick={() => changeCouponCode(coupon.couponCode)}
              style={{ width: "280px" }}
            >
              <div
                className="w-full h-[220px] bg-cover bg-center"
                style={{ backgroundImage: `url(${coupon.imageUrl})` }}
              />
              <div className="w-full bg-white text-center py-2 rounded-b-md">
                <div className="flex justify-center items-center gap-2 text-black drop-shadow-md text-lg font-bold">
                  <span>{coupon.couponCode}</span>
                  <span>-</span>
                  <span>{coupon.discountPercentage}% OFF</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scoped styles for slide widths */}
        <style>{`
        .coupon-slide {
          width: 66%;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .swiper-slide-active.coupon-slide {
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  coupons: couponsMapSelector(state),
});

const mapDispatchToProps = {
  changeCouponCode: changeCouponCodeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CouponCarousel);
