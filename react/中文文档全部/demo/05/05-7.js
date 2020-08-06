// 内置 Hook API
// 基础Hook和额外的Hook（后面的不常用）
// 前三个是常用的Hook

useState
// const [state, setstate] = useState(initialState)

useEffect
// useEffect(() => {
//   effect
//   return () => {
//     cleanup
//   };
// }, [input])

useContext
// const context = useContext(contextValue)

useReducer 
// const [state, dispatch] = useReducer(reducer, initialState, init)

useCallback 
// useCallback(
//   () => {
//     callback
//   },
//   [input],
// )

useMemo 
// useMemo(() => function, input)

useRef 
// const ref = useRef(initialValue)