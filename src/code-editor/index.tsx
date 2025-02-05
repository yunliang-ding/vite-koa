import { useEffect, useRef, useState } from 'react';
import { isEmpty } from '../components/shared';
import { decrypt, encrypt } from '../util';
import Monaco from '../monaco';
import debounce from 'lodash.debounce';
import './index.less';

export default ({
  value,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = '() => {}',
  noChangeClearCode = false,
  useEncrypt = true,
  debounceTime = 300,
  ...rest
}: any) => {
  const [errorInfo, setErrorInfo] = useState('');
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return (
    <div
      className='function-data-box'
      style={style}
    >
      {errorInfo && <div className="function-data-error-info">{errorInfo}</div>}
      <Monaco
        value={decrypt(value, false) || defaultCode}
        {...rest}
        onChange={debounce(async (codeString: string) => {
          try {
            if (
              isEmpty(codeString) ||
              (codeString === defaultCode && noChangeClearCode)
            ) {
              setErrorInfo('');
              return onChange(undefined);
            }
            valueRef.current = codeString; // 同步文本
            // const result = babelParse({
            //   code: codeString,
            //   require,
            // });
            // 校验通过才触发 onChange
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(String(error));
          }
        }, debounceTime)}
      />
    </div>
  );
};
