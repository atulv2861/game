import React, { useEffect, useState, useRef } from "react";
import Style from "./CreateQuizComponent.module.css";
import del from "../../assets/delete.svg";
import cross from "../../assets/cross.svg";
import useQuiz from "../Hook/useQuiz";
import { useSelector } from "react-redux";
import getStorage from "../../Service/StorageService";
import { updateQuiz } from "../../Service/quiz/updateQuiz";
import { toast } from "react-toastify";
export default function CreateQuizComponent({
    setIsCreateQuizPopupOpen,
    setIsConfirmQuizPopupOpen,
    quizzieType,
    quizName,
    setQuizId,
    setQuizName,
    quizId,
    setQuizzieType }) {
    const [createQuizPopupPosition, setCreateQuizPopupPosition] = useState();
    const [questions, setQuestions] = useState([0]);
    const [noOfOptions, setNoOfOptions] = useState([1, 2]);
    const [optionType, setOptionType] = useState("Text");
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [selectedRadioBtn, setSelectedRadioBtn] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([
        { question: '', optionType: optionType, options: [], answer: '', timer: 0 }
    ]);
    const { handleCreateQuiz, handleGetQuizByUserId } = useQuiz();
    const { createdQuiz, quizByUserId } = useSelector((state) => state.quiz);
    const [fieldErrors, setFieldErrors] = useState();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleRadioChange = (indx) => {
        setSelectedRadioBtn(indx);
    };

    const handleCancel = () => {
        setIsCreateQuizPopupOpen(false);

    }

    const handleCreateQuizzes = async () => {
       
        if (!quizQuestions[selectedQuestion]?.question?.trim()) {
            toast.error('Question should not be empty!');
            return;
        }

        if (!quizQuestions[selectedQuestion]?.answer?.trim() && quizzieType==='Q&A') {
            toast.error('Please select the correct answer!');
            return;
        }
        const data = {
            quizName: quizName,
            quizType: quizzieType,
            quizQuestions: quizQuestions
        }
        if (quizId) {
            const data = {
                quizQuestions: quizQuestions
            }
            const res = await updateQuiz(quizId, data);
            if (res?.status === 201) {
                const user = JSON.parse(getStorage("user"));
                await handleGetQuizByUserId(user?._id);
                setIsCreateQuizPopupOpen(false);
                setIsConfirmQuizPopupOpen(true);
                return;
            }
            toast.error(res?.data?.message);

        }
        await handleCreateQuiz(data);
        setIsCreateQuizPopupOpen(false);
        setIsConfirmQuizPopupOpen(true);
        setQuizName(null);
    }

    useEffect(() => {
        const initial = async () => {
            const user = JSON.parse(getStorage("user"));
            if (createdQuiz?.success && user) {
                setQuizId(createdQuiz?.quiz?._id);
                await handleGetQuizByUserId(user?._id);
            }
        }
        initial();
    }, [createdQuiz]);

    useEffect(() => {
        let left = (window.innerWidth - 700) / 2;
        let top = (window.innerHeight - 550) / 2;
        setCreateQuizPopupPosition({ left: left, top: top });

    }, [window.innerWidth]);

    useEffect(() => {
        const question = quizQuestions[selectedQuestion];
        const option = question?.options;
        const optionType = question?.optionType;
        const answer = question?.answer;
        const optionSize = option?.length;
        const indxOfAns = option?.indexOf(answer);
        const arr = Array.from({ length: optionSize ? optionSize : 2 }, (v, i) => i);
        setNoOfOptions(arr);
        if (optionType === "Text_ImageUrl") {
            const indxOfAns = option.findIndex(item => item.text === answer.text && item.img === answer.img);
            setSelectedRadioBtn(indxOfAns);
            return;
        }
        if (option[0]?.length > 0 || option[1]?.length > 0)
            setSelectedRadioBtn(indxOfAns);
    }, [selectedQuestion]);

    const addQuestions = (e) => {
          
        if (!quizQuestions[selectedQuestion]?.question?.trim()) {
            toast.error('Question should not be empty!');
            return;
        }

        if (!quizQuestions[selectedQuestion]?.answer?.trim() && quizzieType==='Q&A') {
            toast.error('Please select the correct answer!');
            return;
        }
       
        const noOfQuestions = questions[questions.length - 1];
        setQuestions([...questions, noOfQuestions + 1]);
        setQuizQuestions(prev => [...prev, { question: '', optionType: optionType, options: ["", ""], answer: '', timer: 0 }])
        setSelectedQuestion(noOfQuestions + 1)
        setNoOfOptions([1, 2]);
        setSelectedRadioBtn(null);
        //setOptionType(pre => pre);             
    }

    const handleOptionType = (e) => {
        const updatedQuizQuestions = [...quizQuestions];
        updatedQuizQuestions[selectedQuestion] = {
            ...updatedQuizQuestions[selectedQuestion],
            optionType: e.target.value,
        };
        setQuizQuestions(updatedQuizQuestions);
        setOptionType(e.target.value);
    }

    const handleRemoveQuestions = (val, e) => {
        e.preventDefault();
        e.stopPropagation();
        const remaningQuestions = questions.filter(value => value !== val);
        setQuestions(remaningQuestions);
        if (val <= selectedQuestion) {
            setSelectedQuestion(prev => prev - 1);
        }
        let updatedQuestion = quizQuestions?.filter((item, index) => val !== index && item);
        setQuizQuestions(updatedQuestion);
    }

    const handleAddOptions = () => {
        const noOfOption = noOfOptions.length;
        setNoOfOptions([...noOfOptions, noOfOption + 1]);
    }

    const handleRemoveOptions = (item1, e) => {
        e.preventDefault();
        e.stopPropagation();
        const remaningOptions = noOfOptions.filter(value => value !== item1);
        setNoOfOptions(remaningOptions);

        let values = [...quizQuestions]
        values = values?.map((item, itemIndex) => {
            if (itemIndex === selectedQuestion) {
                const updatedOptions = [...item.options];
                updatedOptions.splice(item1, 1);                
                return { ...item, options: updatedOptions };
            }
            return item;
        });
        setQuizQuestions(values);
    }


    useEffect(() => {
        const values = [...quizQuestions];
        values[selectedQuestion] = {
            ...values[selectedQuestion],
            optionType: optionType,
        };
        setQuizQuestions(values);
    }, [optionType]);

    const handleQuizQuestionChange = (indx, e) => {
        let values = [...quizQuestions];
        if (e.target.name === "ImageUrl") {
            if (values[selectedQuestion].options[indx]) {
                //values[selectedQuestion].options[indx].img = e.target.value;
                values = values.map((item, itemIndex) => {
                    if (itemIndex === selectedQuestion) {
                        const updatedOptions = item.options.map((option, optionIndex) => {
                            if (optionIndex === indx) {
                                return { ...option, img: e.target.value };
                            }
                            return option;
                        });
                        return { ...item, options: updatedOptions };
                    }
                    return item;
                });
            } else {
                //values[selectedQuestion].options[indx] = { "img": e.target.value };
                values = values?.map((item, itemIndex) => {
                    if (itemIndex === selectedQuestion) {
                        const updatedOptions = [...item.options];
                        updatedOptions[indx] = { "img": e.target.value };
                        return { ...item, options: updatedOptions };
                    }
                    return item;
                });
            }
        }
        if (e.target.name === "Text") {
            if (values[selectedQuestion].options[indx]) {
                //values[selectedQuestion].options[indx].text = e.target.value;
                values = values.map((item, itemIndex) => {
                    if (itemIndex === selectedQuestion) {
                        const updatedOptions = item.options.map((option, optionIndex) => {
                            if (optionIndex === indx) {
                                return { ...option, text: e.target.value };
                            }
                            return option;
                        });
                        return { ...item, options: updatedOptions };
                    }
                    return item;
                });
            } else {
                //values[selectedQuestion].options[indx] = { "text": e.target.value };
                values = values?.map((item, itemIndex) => {
                    if (itemIndex === selectedQuestion) {
                        const updatedOptions = [...item.options];
                        updatedOptions[indx] = { "text": e.target.value };
                        return { ...item, options: updatedOptions };
                    }
                    return item;
                });
            }
        }
        if (e.target.name === "options") {
            //values[selectedQuestion].options[indx] = e.target.value;
            values = values?.map((item, itemIndex) => {
                if (itemIndex === selectedQuestion) {
                    const updatedOptions = [...item.options];
                    updatedOptions[indx] = e.target.value;
                    return { ...item, options: updatedOptions };
                }
                return item;
            });
        } else if (e.target.name === "answer") {
            //values[selectedQuestion][e.target.name] = values[selectedQuestion].options[indx];
            values[selectedQuestion] = {
                ...values[selectedQuestion],
                answer: values[selectedQuestion].options[indx]
            };
           
        } else if (e.target.name === "question") {            
            
            values[selectedQuestion] = {
                ...values[selectedQuestion],
                question: e.target.value,
            };

        
        } else if (e.target.name === "timer") {
            values[selectedQuestion] = {
                ...values[selectedQuestion],
                timer: e.target.value,
            };
        } else {
            //values[selectedQuestion][e.target.name] = e.target.value;
        }
        setQuizQuestions(values);
    };

    useEffect(() => {
        const initial = () => {
            const updateQuiz = quizByUserId?.quizzes?.filter(item => item?._id === quizId);
            setOptionType(updateQuiz[0]?.quizQuestions[0]?.optionType);
            setQuizzieType(updateQuiz[0]?.quizType);
            setSelectedQuestion(updateQuiz[0]?.quizQuestions?.length - 1);
            const noOfQuestions = Array(updateQuiz[0]?.quizQuestions?.length).fill().map((_, index) => index);
            setQuestions(noOfQuestions);
            setQuizQuestions(updateQuiz[0]?.quizQuestions);
        }
        if (quizId) {
            initial();
        }
    }, [quizId]);

    return (
        <div className={Style.Wrapper}
            style={{ left: `${createQuizPopupPosition?.left}px`, top: `${createQuizPopupPosition?.top}px` }}>
            <div className={Style.Heading}>
                <div className={Style.Questions}>
                    {questions && questions?.map((item, indx) => (
                        item === 0 ?
                            <button key={indx}
                                className={Style.Slide}
                                onClick={
                                    (e) => {
                                        setSelectedQuestion(indx);
                                    }}
                            >{indx + 1}</button> :
                            <button key={indx} className={Style.Slide} onClick={(e) => { setSelectedQuestion(indx); }}>{indx + 1}
                                <img
                                    src={cross}
                                    onClick={(e) => handleRemoveQuestions(item, e)}
                                    className={Style.Close}
                                    alt=""
                                />
                            </button>
                    ))}
                    {questions && questions.length < 5 &&
                        <button className={Style.AddQuestion} onClick={(e) => addQuestions(e)}>+</button>
                    }
                </div>
                <div style={{ marginRight: "50px" }}><h2>Max 5 Questions</h2></div>
            </div>
            <div className={Style.InputContainer}>
                <input
                    type="text"
                    placeholder="Quiz Question"
                    className={`${Style.InputBox} ${fieldErrors?.question && Style.ErrorMsg}`}
                    name="question"
                    ref={inputRef}
                    value={quizQuestions[selectedQuestion]?.question}
                    onChange={e => handleQuizQuestionChange(0, e)}
                />
            </div>
            <div className={Style.OptionTypeContainer}>
                <div className={Style.QuizHeading}>Option Type</div>
                <div className={Style.OptionType}>
                    <label>
                        <input type="radio"
                            onChange={e => { handleOptionType(e); }} checked={quizQuestions[selectedQuestion]?.optionType === "Text" && true} name="optionType" value="Text" />
                        Text
                    </label>
                    <label>
                        <input type="radio" onChange={e => { handleOptionType(e); }} checked={quizQuestions[selectedQuestion]?.optionType === "ImageUrl" && true} name="optionType" value="ImageUrl" />
                        Image URL
                    </label>
                    <label>
                        <input type="radio" onChange={e => { handleOptionType(e); }} checked={quizQuestions[selectedQuestion]?.optionType === "Text_ImageUrl" && true} name="optionType" value="Text_ImageUrl" />
                        Text & Image URL
                    </label>

                </div>
            </div>
            {quizzieType === "Q&A" ? <div className={Style.Options}>
                {quizQuestions[selectedQuestion]?.optionType === "Text" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label" key={indx}>
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn == indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Text"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                    autoComplete="off"
                                />
                            </div> :
                            <div className="radio-label" key={indx}>
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Text"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                    autoComplete="off"
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }

                </div>}
                {quizQuestions[selectedQuestion]?.optionType === "ImageUrl" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label">
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                            </div> :
                            <div className="radio-label">
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }
                </div>}
                {quizQuestions[selectedQuestion]?.optionType === "Text_ImageUrl" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label">
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Text"
                                    name="Text"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.text ? quizQuestions[selectedQuestion]?.options[indx]?.text : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="ImageUrl"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.img ? quizQuestions[selectedQuestion]?.options[indx]?.img : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                            </div> :
                            <div className="radio-label">
                                <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Text"
                                    name="Text"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.text ? quizQuestions[selectedQuestion]?.options[indx]?.text : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox} ${selectedRadioBtn === indx && Style.SelectedRadioBtn}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="ImageUrl"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.img ? quizQuestions[selectedQuestion]?.options[indx]?.img : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }
                </div>}
                <div className={Style.Timer}>
                    <div>Timer</div>
                    <div><button
                        className={`${Style.TimerButton} ${quizQuestions[selectedQuestion]?.timer == "0" && Style.TimerBtnColor}`}
                        onClick={e => { handleQuizQuestionChange(0, e) }} name="timer" value="0">Off</button></div>
                    <div><button
                        className={`${Style.TimerButton} ${quizQuestions[selectedQuestion]?.timer == "5" && Style.TimerBtnColor}`}
                        onClick={e => { handleQuizQuestionChange(0, e) }} name="timer" value="5">5 Sec</button></div>
                    <div><button
                        className={`${Style.TimerButton} ${quizQuestions[selectedQuestion]?.timer == "10" && Style.TimerBtnColor}`}
                        onClick={e => { handleQuizQuestionChange(0, e) }} name="timer" value="10">10 Sec</button></div>
                </div>
            </div> : <div className={Style.Options} style={{ marginLeft: "10px" }}>
                {quizQuestions[selectedQuestion]?.optionType === "Text" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Text"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                            </div> :
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Text"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }
                </div>}
                {quizQuestions[selectedQuestion]?.optionType === "ImageUrl" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Image Url"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                            </div> :
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Image Url"
                                    name="options"
                                    value={typeof quizQuestions[selectedQuestion]?.options[indx] !== 'object' ? quizQuestions[selectedQuestion]?.options[indx] : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }
                </div>}
                {quizQuestions[selectedQuestion]?.optionType === "Text_ImageUrl" && <div className={Style.AddOptions}>
                    {noOfOptions && noOfOptions?.map((item, indx) => (
                        item < 2 ?
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Text"
                                    name="Text"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.text ? quizQuestions[selectedQuestion]?.options[indx]?.text : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="ImageUrl"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.img ? quizQuestions[selectedQuestion]?.options[indx]?.img : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                            </div> :
                            <div className="radio-label" key={indx}>
                                {/* <input
                                    type="radio"
                                    style={{ color: "red" }}
                                    name="answer"
                                    value={indx}
                                    onChange={(e) => { handleRadioChange(indx); handleQuizQuestionChange(indx, e) }}
                                    checked={selectedRadioBtn === indx}
                                />&nbsp;&nbsp; */}
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    placeholder="Text"
                                    name="Text"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.text ? quizQuestions[selectedQuestion]?.options[indx]?.text : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />&nbsp;&nbsp;
                                <input
                                    className={`${Style.RadioInputBox}`}
                                    type="text"
                                    placeholder="Image Url"
                                    name="ImageUrl"
                                    value={quizQuestions[selectedQuestion]?.options[indx]?.img ? quizQuestions[selectedQuestion]?.options[indx]?.img : ""}
                                    onChange={e => handleQuizQuestionChange(indx, e)}
                                />
                                <img
                                    src={del}
                                    onClick={e => handleRemoveOptions(item, e)}
                                    style={{ marginLeft: "10px", alignItems: "center" }} alt="" />
                            </div>
                    ))}
                    {noOfOptions && noOfOptions.length < 4 &&
                        <div style={{ marginLeft: "20px" }}>
                            <button
                                onClick={e => handleAddOptions()}
                                className={Style.AddOptionButton} >Add Option</button>
                        </div>
                    }
                </div>}
            </div>}
            <div className={Style.CancelnCreateBtn}>
                <button className={Style.Button} onClick={handleCancel}>Cancel</button>
                <button className={Style.Button} style={{ background: "#60B84B", color: "white" }} onClick={handleCreateQuizzes}>{quizId ? 'Update Quiz' : 'Create Quiz'}</button>
            </div>
        </div>
    )
}