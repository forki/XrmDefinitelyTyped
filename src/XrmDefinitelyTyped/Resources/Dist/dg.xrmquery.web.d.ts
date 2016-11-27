interface WebEntities {
}
declare var GetGlobalContext: any;
interface WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult> {
    __WebMappingRetrieve: ISelect;
}
interface WebMappingCUD<ICreate, IUpdate> {
    __WebMappingCUD: ICreate & IUpdate;
}
interface WebMappingRelated<ISingle, IMultiple> {
    _WebMappingRelated: ISingle & IMultiple;
}
interface WebAttribute<ISelect, Result, Formatted> {
    __WebAttribute: ISelect;
}
interface WebExpand<IExpand, ChildSelect, ChildFilter, Result> {
    __WebExpandable: IExpand;
}
interface WebFilter {
    __WebFilter: any;
}
declare const enum SortOrder {
    Ascending = 1,
    Descending = 2,
}
interface ExpandOptions<ISelect, IFilter> {
    filter?: (f: IFilter) => WebFilter;
    top?: number;
    orderBy?: (s: ISelect) => WebAttribute<ISelect, any, any>;
    sortOrder?: SortOrder;
}
declare namespace Filter {
    function equals<T extends null | string | number | Date | XQW.Guid>(v1: T, v2: T): WebFilter;
    function notEquals<T extends null | string | number | Date | XQW.Guid>(v1: T, v2: T): WebFilter;
    function greaterThan<T extends number | Date>(v1: T, v2: T): WebFilter;
    function greaterThanOrEqual<T extends number | Date>(v1: T, v2: T): WebFilter;
    function lessThan<T extends number | Date>(v1: T, v2: T): WebFilter;
    function lessThanOrEqual<T extends number | Date>(v1: T, v2: T): WebFilter;
    function and(f1: WebFilter, f2: WebFilter): WebFilter;
    function or(f1: WebFilter, f2: WebFilter): WebFilter;
    function not(f1: WebFilter): WebFilter;
    function ands(fs: WebFilter[]): WebFilter;
    function ors(fs: WebFilter[]): WebFilter;
    function startsWith(v1: string, v2: string): WebFilter;
    function substringOf(v1: string, v2: string): WebFilter;
    function endsWith(v1: string, v2: string): WebFilter;
    /**
     * Makes a string into a GUID that can be sent to the OData source
     */
    function makeGuid(id: string): XQW.Guid;
}
declare namespace XrmQuery {
    function setApiUrl(url: string | null): void;
    function setApiVersion(v: string): void;
    function retrieveMultiple<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>): XQW.RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>;
    function retrieveRelatedRecord<ISingle, ISelect, IExpand, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRelated<ISingle, any>, id: string, relatedPicker: (x: ISingle) => WebMappingRetrieve<ISelect, IExpand, any, IFixed, Result, FormattedResult>): XQW.RetrieveRecord<ISelect, IExpand, IFixed, Result, FormattedResult>;
    function retrieveRelatedMultiple<IMultiple, ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRelated<any, IMultiple>, id: string, relatedPicker: (x: IMultiple) => WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>): XQW.RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>;
    function retrieve<ISelect, IExpand, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRetrieve<ISelect, IExpand, any, IFixed, Result, FormattedResult>, id: string): XQW.RetrieveRecord<ISelect, IExpand, IFixed, Result, FormattedResult>;
    function create<ICreate>(entityPicker: (x: WebEntities) => WebMappingCUD<ICreate, any>, record?: ICreate): XQW.CreateRecord<ICreate>;
    function update<IUpdate>(entityPicker: (x: WebEntities) => WebMappingCUD<any, IUpdate>, id?: string, record?: IUpdate): XQW.UpdateRecord<IUpdate>;
    function deleteRecord(entityPicker: (x: WebEntities) => WebMappingCUD<any, any>, id?: string): XQW.DeleteRecord;
    function sendCbRequest(type: XQW.HttpRequestType, queryString: string, data: any, successCb: (x: XMLHttpRequest) => any, errorCb: (err: Error) => any, preSend?: (req: XMLHttpRequest) => void): void;
    function sendRequest(type: XQW.HttpRequestType, queryString: string, data: any, configure?: (req: XMLHttpRequest) => void): Promise<XMLHttpRequest>;
}
declare namespace XQW {
    type HttpRequestType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    interface RequestHeader {
        type: string;
        value: string;
    }
    interface Guid {
        __XqwGuid: any;
    }
    abstract class Query<T> {
        protected requestType: HttpRequestType;
        protected additionalHeaders: RequestHeader[];
        constructor(requestType: HttpRequestType);
        abstract getQueryString(): string;
        protected abstract handleResponse(req: XMLHttpRequest, successCallback: (t: T) => any, errorCallback: (e: Error) => any): void;
        protected getObjectToSend: () => any;
        promise(): Promise<T>;
        executeCallback(successCallback: (x: T) => any, errorCallback?: (err: Error) => any): void;
        _executeRaw(successCallback: (x: XMLHttpRequest) => any, errorCallback: (err: Error) => any, parseResult: false): void;
    }
    class RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, FormattedResult, Result> extends Query<Result[]> {
        private entitySetName;
        private id;
        private relatedNav;
        static Get<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>;
        static Related<IMultiple, ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRelated<any, IMultiple>, id: string, relatedPicker: (x: IMultiple) => WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult>;
        private constructor(entitySetName, id?, relatedNav?);
        handleResponse(req: XMLHttpRequest, successCallback: (r: Result[]) => any, errorCallback: (e: Error) => any): void;
        getFirst(successCallback: (r: Result | null) => any, errorCallback?: (e: Error) => any): void;
        promiseFirst(): Promise<Result>;
        getQueryString(): string;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14, R15, F15>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>, WebAttribute<ISelect, R15, F15>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6, IFixed & R1 & R2 & R3 & R4 & R5 & R6>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5, IFixed & R1 & R2 & R3 & R4 & R5>;
        select<R1, F1, R2, F2, R3, F3, R4, F4>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4, IFixed & R1 & R2 & R3 & R4>;
        select<R1, F1, R2, F2, R3, F3>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3, IFixed & R1 & R2 & R3>;
        select<R1, F1, R2, F2>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2, IFixed & R1 & R2>;
        select<R1, F1>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1, IFixed & R1>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14, R15, F15>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>, WebAttribute<ISelect, R15, F15>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5 & F6, Result & R1 & R2 & R3 & R4 & R5 & R6>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4 & F5, Result & R1 & R2 & R3 & R4 & R5>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3 & F4, Result & R1 & R2 & R3 & R4>;
        selectMore<R1, F1, R2, F2, R3, F3>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2 & F3, Result & R1 & R2 & R3>;
        selectMore<R1, F1, R2, F2>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1 & F2, Result & R1 & R2>;
        selectMore<R1, F1>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, F1, Result & R1>;
        expand<IExpSelect, IExpFilter, IExpResult>(exps: (x: IExpand) => WebExpand<IExpand, IExpSelect, IExpFilter, IExpResult>, selectVars?: (x: IExpSelect) => WebAttribute<IExpSelect, any, any>[]): RetrieveMultipleRecords<ISelect, IExpand, IFilter, IFixed, FormattedResult, IExpResult & Result>;
        filter(filter: (x: IFilter) => WebFilter): this;
        orFilter(filter: (x: IFilter) => WebFilter): this;
        andFilter(filter: (x: IFilter) => WebFilter): this;
        orderAsc(vars: (x: ISelect) => WebAttribute<ISelect, any, any>): this;
        orderDesc(vars: (x: ISelect) => WebAttribute<ISelect, any, any>): this;
        skip(amount: number): this;
        top(amount: number): this;
        includeFormattedValues(): Query<(FormattedResult & Result)[]>;
        maxPageSize(size: number): this;
    }
    class RetrieveRecord<ISelect, IExpand, IFixed, FormattedResult, Result> extends Query<Result> {
        private entitySetName;
        private id;
        private relatedNav;
        static Related<ISingle, ISelect, IExpand, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRelated<ISingle, any>, id: string, relatedPicker: (x: ISingle) => WebMappingRetrieve<ISelect, IExpand, any, IFixed, Result, FormattedResult>): RetrieveRecord<ISelect, IExpand, IFixed, Result, FormattedResult>;
        static Get<ISelect, IExpand, IFixed, Result, FormattedResult>(entityPicker: (x: WebEntities) => WebMappingRetrieve<ISelect, IExpand, any, IFixed, Result, FormattedResult>, id: string): RetrieveRecord<ISelect, IExpand, IFixed, Result, FormattedResult>;
        private constructor(entitySetName, id, relatedNav?);
        handleResponse(req: XMLHttpRequest, successCallback: (r: Result) => any, errorCallback: (e: Error) => any): void;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14, R15, F15>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>, WebAttribute<ISelect, R15, F15>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7, IFixed & R1 & R2 & R3 & R4 & R5 & R6 & R7>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6, IFixed & R1 & R2 & R3 & R4 & R5 & R6>;
        select<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5, IFixed & R1 & R2 & R3 & R4 & R5>;
        select<R1, F1, R2, F2, R3, F3, R4, F4>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4, IFixed & R1 & R2 & R3 & R4>;
        select<R1, F1, R2, F2, R3, F3>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3, IFixed & R1 & R2 & R3>;
        select<R1, F1, R2, F2>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2, IFixed & R1 & R2>;
        select<R1, F1>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>]): RetrieveRecord<ISelect, IExpand, IFixed, F1, IFixed & R1>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14, R15, F15>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>, WebAttribute<ISelect, R15, F15>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14 & R15>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13, R14, F14>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>, WebAttribute<ISelect, R14, F14>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13 & R14>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12, R13, F13>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>, WebAttribute<ISelect, R13, F13>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12 & R13>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11, R12, F12>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>, WebAttribute<ISelect, R12, F12>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11 & R12>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10, R11, F11>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>, WebAttribute<ISelect, R11, F11>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10 & R11>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9, R10, F10>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>, WebAttribute<ISelect, R10, F10>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9 & R10>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8, R9, F9>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>, WebAttribute<ISelect, R9, F9>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7, R8, F8>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>, WebAttribute<ISelect, R8, F8>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6, R7, F7>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>, WebAttribute<ISelect, R7, F7>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6 & F7, Result & R1 & R2 & R3 & R4 & R5 & R6 & R7>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5, R6, F6>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>, WebAttribute<ISelect, R6, F6>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5 & F6, Result & R1 & R2 & R3 & R4 & R5 & R6>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4, R5, F5>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>, WebAttribute<ISelect, R5, F5>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4 & F5, Result & R1 & R2 & R3 & R4 & R5>;
        selectMore<R1, F1, R2, F2, R3, F3, R4, F4>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>, WebAttribute<ISelect, R4, F4>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3 & F4, Result & R1 & R2 & R3 & R4>;
        selectMore<R1, F1, R2, F2, R3, F3>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>, WebAttribute<ISelect, R3, F3>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2 & F3, Result & R1 & R2 & R3>;
        selectMore<R1, F1, R2, F2>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>, WebAttribute<ISelect, R2, F2>]): RetrieveRecord<ISelect, IExpand, IFixed, F1 & F2, Result & R1 & R2>;
        selectMore<R1, F1>(vars: (x: ISelect) => [WebAttribute<ISelect, R1, F1>]): RetrieveRecord<ISelect, IExpand, IFixed, F1, Result & R1>;
        expand<IExpSelect, IExpFilter, IExpResult>(exps: (x: IExpand) => WebExpand<IExpand, IExpSelect, IExpFilter, IExpResult>, selectVars?: (x: IExpSelect) => WebAttribute<IExpSelect, any, any>[], optArgs?: ExpandOptions<IExpSelect, IExpFilter>): RetrieveRecord<ISelect, IExpand, IFixed, FormattedResult, Result & IExpResult>;
        getQueryString(): string;
        includeFormattedValues(): Query<FormattedResult & Result>;
    }
    /**
     * Contains information about a Create query
     */
    class CreateRecord<ICreate> extends Query<string> {
        private record;
        constructor(entityPicker: (x: WebEntities) => WebMappingCUD<ICreate, any>, record?: ICreate);
        handleResponse(req: XMLHttpRequest, successCallback: (r: string) => any, errorCallback: (e: Error) => any): void;
        setData(record: ICreate): this;
        protected getObjectToSend: () => string;
        getQueryString(): string;
    }
    /**
     * Contains information about a Delete query
     */
    class DeleteRecord extends Query<void> {
        private id;
        constructor(entityPicker: (x: WebEntities) => WebMappingCUD<any, any>, id?: string);
        handleResponse(req: XMLHttpRequest, successCallback: () => any): void;
        setId(id: string): this;
        getQueryString(): string;
    }
    /**
     * Contains information about an UpdateRecord query
     */
    class UpdateRecord<IUpdate> extends Query<void> {
        private id;
        private record;
        constructor(entityPicker: (x: WebEntities) => WebMappingCUD<any, IUpdate>, id?: string, record?: IUpdate);
        handleResponse(req: XMLHttpRequest, successCallback: () => any): void;
        setData(id: string, record: IUpdate): this;
        protected getObjectToSend: () => string;
        getQueryString(): string;
    }
    function getDefaultUrl(v: string): string;
    function getApiUrl(): string;
}
