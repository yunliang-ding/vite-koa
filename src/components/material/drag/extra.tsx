export default ({ onDelete, onCopy } : {
  onDelete: Function;
  onCopy: Function;
}) => {
  return (
    <div className="drag-item-extra">
      <i
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            d="M5 11L10.5 11M10.5 11L10.5 40C10.5 40.5523 10.9477 41 11.5 41L36.5 41C37.0523 41 37.5 40.5523 37.5 40V11M10.5 11L16 11M37.5 11L43 11M37.5 11L32 11M16 11V7L32 7V11M16 11L32 11"
            strokeLinecap="butt"
          ></path>
          <path d="M20 18V33M28 18V33" strokeLinecap="butt"></path>
        </svg>
      </i>
      <i
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            d="M20 6H38C39.1046 6 40 6.89543 40 8V30M8 16V40C8 41.1046 8.89095 42 9.99552 42H30.0026C31.1072 42 32 41.1131 32 40.0085V15.9968C32 14.8922 31.1046 14 30 14H10C8.89543 14 8 14.8954 8 16Z"
            strokeLinecap="butt"
          ></path>
        </svg>
      </i>
    </div>
  );
};
