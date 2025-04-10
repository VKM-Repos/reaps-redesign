export type RangeKey = "today" | "last7days"  | "yesterday"  |  "lastWeek"  | "last14days" | "last30days" | "custom";

type BaseRangeListObj<K extends string = RangeKey> = {
  label: string;
  key: K;
};

export type RangeListObj = BaseRangeListObj<RangeKey>;

export type RangeListObjTwo = BaseRangeListObj<string>;

export type DateRangeType = {
  start: Date,
  end: Date 
}

export const range_list: RangeListObj[] = [
    {
        label: 'Today',
        key: 'today'
    },
    {
        label: 'Yesterday',
        key: 'yesterday'
    },
    {
        label: 'Last 7 days',
        key: 'last7days'
    },
    {
        label: 'Last Week',
        key: 'lastWeek'
    },
    {
        label: 'Last 14 days',
        key: 'last14days'
    },
    {
        label: 'Last 30 days',
        key: 'last30days'
    },
    {
        label: 'Custom',
        key: 'custom'
    }
]

export const revenue_comparison_range_list: RangeListObjTwo[] = [
  {
    label: '1 month',
    key: 'oneMonth'
  },
  {
    label: '2 months',
    key: 'twoMonths'
  },
  {
    label: '3 months',
    key: 'threeMonths',
  },
  {
    label: '6 months',
    key: 'sixMonths'
  },
  {
    label: '9 months',
    key: 'nineMonths'
  },
  {
    label: '1 year',
    key: 'oneYear'
  },
  {
    label: 'Custom',
    key: 'custom'
  }
]

export const revenue_category_range_list: RangeListObjTwo[] = [
    {
      label: 'Today',
      key: 'today'
    },
    {
      label: 'Yesterday',
      key: 'yesterday'
    },
    {
      label: 'Last 7 days',
      key: 'last7days'
    },
    {
      label: 'Last Week',
      key: 'lastWeek'
    },
    {
      label: 'Last 14 days',
      key: 'last14days'
    },
    {
      label: 'Last Month',
      key: 'lastMonth'
    },
]

export function formatShortDate(dateInput: any) {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
  
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }




export const getDateRange = (key: RangeKey, customStart?: Date, customEnd?: Date) => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  switch (key) {
    case "today":
      return { start: now, end: now };
    case 'yesterday':
        return { start: new Date(now.getTime() - oneDay), end: new Date(now.getTime() - oneDay) }
    case "last7days":
      return {
        start: new Date(now.getTime() - 6 * oneDay),
        end: now,
      };
    case 'lastWeek':
        return {
            start: new Date(now.getTime() - 7 * oneDay),
            end: new Date(now.getTime() - 7 * oneDay),
        }
    case 'last14days':
        return {
            start: new Date(now.getTime() - 13 * oneDay),
            end: now,
        }
    
    case "last30days":
      return {
        start: new Date(now.getTime() - 29 * oneDay),
        end: now,
      };
    case "custom":
      if (!customStart || !customEnd) throw new Error("Custom range needs start and end");
      return { start: customStart, end: customEnd };

    default:
      throw new Error("Invalid range key");
  }
};


export const preventFutureDateSelection = ( from: Date, to: Date ) => {
    const today = Date.now();
    const rangeStart = from.getTime();
    const rangeEnd = to.getTime(); 
    if (rangeStart > today || rangeEnd > today) {
      return false;
    }
    return true;
}